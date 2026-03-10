-- Alert Config DB Schema
-- This runs against a SEPARATE Postgres instance, not the squid DB.
-- Connection via ALERT_CONFIG_DB_URL environment variable.

-- Valid chain IDs
CREATE TABLE chain (
  id              INTEGER PRIMARY KEY,
  name            TEXT NOT NULL UNIQUE
);
INSERT INTO chain VALUES (1, 'mainnet'), (8453, 'base'), (146, 'sonic');

-- Valid notification topics (maps to Discord webhooks)
CREATE TYPE severity_level AS ENUM ('low', 'medium', 'high', 'critical', 'broken', 'highlight');
CREATE TYPE match_type AS ENUM ('event', 'trace');

-- Valid topics — add rows here as new products launch
CREATE TABLE topic (
  name            TEXT PRIMARY KEY
);
INSERT INTO topic VALUES
  ('Governance'), ('OGN'), ('OGN Alerts'), ('OGN Buybacks'),
  ('xOGN'), ('OETH'), ('superOETHb'), ('OUSD'), ('primeETH'), ('ARM'), ('OS');

-- Helper: validate hex string (0x-prefixed, lowercase hex)
CREATE OR REPLACE FUNCTION is_hex(val TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN val ~ '^0x[0-9a-f]+$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate address (0x + 40 hex chars)
CREATE OR REPLACE FUNCTION is_address(val TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN val ~ '^0x[0-9a-f]{40}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate topic hash (0x + 64 hex chars)
CREATE OR REPLACE FUNCTION is_topic_hash(val TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN val ~ '^0x[0-9a-f]{64}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate sighash (0x + 8 hex chars)
CREATE OR REPLACE FUNCTION is_sighash(val TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN val ~ '^0x[0-9a-f]{8}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate slug ID (lowercase alphanumeric with hyphens)
CREATE OR REPLACE FUNCTION is_slug(val TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN val ~ '^[a-z0-9][a-z0-9\-]*[a-z0-9]$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate all elements in a text array with a given function
CREATE OR REPLACE FUNCTION array_all_match(arr TEXT[], validator TEXT) RETURNS BOOLEAN AS $$
DECLARE
  elem TEXT;
BEGIN
  IF arr IS NULL THEN RETURN TRUE; END IF;
  FOREACH elem IN ARRAY arr LOOP
    CASE validator
      WHEN 'address' THEN IF NOT is_address(elem) THEN RETURN FALSE; END IF;
      WHEN 'topic_hash' THEN IF NOT is_topic_hash(elem) THEN RETURN FALSE; END IF;
      WHEN 'sighash' THEN IF NOT is_sighash(elem) THEN RETURN FALSE; END IF;
    END CASE;
  END LOOP;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate data_filters JSONB structure
-- Accepts: null, FieldCondition, or GroupCondition (recursive AND/OR)
CREATE OR REPLACE FUNCTION is_valid_filter(f JSONB) RETURNS BOOLEAN AS $$
DECLARE
  cond JSONB;
  op TEXT;
  valid_ops TEXT[] := ARRAY['eq','neq','gt','gte','lt','lte','contains','startsWith','endsWith','in','notIn'];
BEGIN
  IF f IS NULL THEN RETURN TRUE; END IF;

  -- GroupCondition: { "op": "AND"|"OR", "conditions": [...] }
  IF f ? 'conditions' THEN
    op := f->>'op';
    IF op NOT IN ('AND', 'OR') THEN RETURN FALSE; END IF;
    IF jsonb_typeof(f->'conditions') != 'array' THEN RETURN FALSE; END IF;
    FOR cond IN SELECT jsonb_array_elements(f->'conditions') LOOP
      IF NOT is_valid_filter(cond) THEN RETURN FALSE; END IF;
    END LOOP;
    RETURN TRUE;
  END IF;

  -- FieldCondition: { "field": "...", "op": "...", "value": "..." }
  IF f ? 'field' AND f ? 'op' AND f ? 'value' THEN
    IF NOT (f->>'op' = ANY(valid_ops)) THEN RETURN FALSE; END IF;
    IF jsonb_typeof(f->'field') != 'string' THEN RETURN FALSE; END IF;
    -- value must be string or array of strings
    IF jsonb_typeof(f->'value') = 'string' THEN RETURN TRUE; END IF;
    IF jsonb_typeof(f->'value') = 'array' THEN
      IF f->>'op' IN ('in', 'notIn') THEN RETURN TRUE; END IF;
    END IF;
    RETURN FALSE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper: validate notify_targets JSONB structure
CREATE OR REPLACE FUNCTION is_valid_notify_targets(t JSONB) RETURNS BOOLEAN AS $$
BEGIN
  IF t IS NULL THEN RETURN TRUE; END IF;
  IF jsonb_typeof(t) != 'object' THEN RETURN FALSE; END IF;
  -- Only allow known keys
  IF t - ARRAY['discordMentions', 'email', 'oncall'] != '{}'::jsonb THEN RETURN FALSE; END IF;
  -- Validate types if present
  IF t ? 'discordMentions' AND jsonb_typeof(t->'discordMentions') != 'array' THEN RETURN FALSE; END IF;
  IF t ? 'email' AND jsonb_typeof(t->'email') != 'array' THEN RETURN FALSE; END IF;
  IF t ? 'oncall' AND jsonb_typeof(t->'oncall') != 'boolean' THEN RETURN FALSE; END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ─── Alert Rule ───────────────────────────────────────────────────────────────

CREATE TABLE alert_rule (
  id              TEXT PRIMARY KEY CHECK (is_slug(id)),
  enabled         BOOLEAN NOT NULL DEFAULT true,
  chain_id        INTEGER NOT NULL REFERENCES chain(id),

  -- What type of on-chain data does this rule match?
  match_type      match_type NOT NULL,

  -- Matching criteria (NULL = any)
  addresses       TEXT[] CHECK (array_all_match(addresses, 'address')),
  topic0s         TEXT[] CHECK (array_all_match(topic0s, 'topic_hash')),
  topic1s         TEXT[] CHECK (array_all_match(topic1s, 'topic_hash')),
  topic2s         TEXT[] CHECK (array_all_match(topic2s, 'topic_hash')),
  topic3s         TEXT[] CHECK (array_all_match(topic3s, 'topic_hash')),
  sighashes       TEXT[] CHECK (array_all_match(sighashes, 'sighash')),

  -- Conditions on decoded data — evaluated after matching.
  -- Supports AND/OR trees with comparison operators.
  data_filters    JSONB CHECK (is_valid_filter(data_filters)),

  -- Notification routing
  topic           TEXT NOT NULL REFERENCES topic(name),
  severity        severity_level NOT NULL DEFAULT 'low',
  notify_targets  JSONB CHECK (is_valid_notify_targets(notify_targets)),

  -- Display
  display_name    TEXT,
  description     TEXT,

  -- Metadata
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Cross-field constraints
  CONSTRAINT event_fields_only CHECK (
    match_type = 'trace' OR sighashes IS NULL
  ),
  CONSTRAINT trace_fields_only CHECK (
    match_type = 'event' OR (topic0s IS NULL AND topic1s IS NULL AND topic2s IS NULL AND topic3s IS NULL)
  )
);

CREATE INDEX idx_alert_rule_chain_id ON alert_rule (chain_id);
CREATE INDEX idx_alert_rule_match_type ON alert_rule (match_type);
CREATE INDEX idx_alert_rule_enabled ON alert_rule (enabled);
CREATE INDEX idx_alert_rule_topic ON alert_rule (topic);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER alert_rule_updated_at
  BEFORE UPDATE ON alert_rule
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Contract Info ────────────────────────────────────────────────────────────

CREATE TABLE contract_info (
  address         TEXT NOT NULL CHECK (is_address(address)),
  chain_id        INTEGER NOT NULL REFERENCES chain(id),
  name            TEXT NOT NULL,
  product         TEXT REFERENCES topic(name),
  tags            TEXT[],
  PRIMARY KEY (address, chain_id)
);

CREATE INDEX idx_contract_info_product ON contract_info (product);
