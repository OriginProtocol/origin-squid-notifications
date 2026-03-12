-- Seed data for alert config DB
-- Generated from current ABI registry and notification processors
-- Generated at: 2026-03-10T21:47:27.295Z

BEGIN;

-- Lido ARM Pendle SY (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'lido-arm-pendle-sy',
  1,
  'event'::match_type,
  ARRAY['0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184'],
  ARRAY['0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f', '0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'medium'::severity_level,
  NULL,
  'Lido ARM Pendle SY'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-1',
  1,
  'event'::match_type,
  ARRAY['0xceda2d856238aa0d12f6329de20b9115f07c366d'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-2',
  1,
  'event'::match_type,
  ARRAY['0xceda2d856238aa0d12f6329de20b9115f07c366d'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x000000000000000000000000ceda2d856238aa0d12f6329de20b9115f07c366d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-1',
  1,
  'event'::match_type,
  ARRAY['0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-2',
  1,
  'event'::match_type,
  ARRAY['0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x000000000000000000000000fb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-1',
  1,
  'event'::match_type,
  ARRAY['0x85b78aca6deae198fbf201c82daf6ca21942acc6'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-2',
  1,
  'event'::match_type,
  ARRAY['0x85b78aca6deae198fbf201c82daf6ca21942acc6'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x00000000000000000000000085b78aca6deae198fbf201c82daf6ca21942acc6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-1-sonic',
  146,
  'event'::match_type,
  ARRAY['0x2f872623d1e1af5835b08b0e49aad2d81d649d30'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-2-sonic',
  146,
  'event'::match_type,
  ARRAY['0x2f872623d1e1af5835b08b0e49aad2d81d649d30'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-3-sonic',
  146,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000002f872623d1e1af5835b08b0e49aad2d81d649d30'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Mainnet Multisig (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'mainnet-multisig',
  1,
  'event'::match_type,
  ARRAY['0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Mainnet Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Origin Governance (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-governance',
  1,
  'event'::match_type,
  ARRAY['0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec'],
  ARRAY['0x7ca4ac117ed3cdce75c1161d8207c440389b1a15d69d096831664657c07dafc2', '0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c', '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0', '0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f', '0x541f725fb9f7c98a30cc9c0ff32fbb14358cd7159c847a3aa20a2bdc442ba511', '0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892', '0xccb45da8d5717e6c4544694297c4ba5cf151d455c9bb0ed4fc7a38411bc05461', '0x0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997', '0x08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401', '0xc565b045403dc03c2eea82b81a0465edad9e2e7fc4d97e11421c209da93d7a93', '0x7e3f7f0708a84de9203036abaa450dccc85ad5ff52f78c170f3edb55cf5e8828'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Governance'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts',
  1,
  'event'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d', '0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xda0485c1e74a7ef690e99d8286c243942edaa07b', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63', '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5', '0xc1fc9e5ec3058921ea5025d703cbe31764756319', '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc', '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90', '0x5e3646a1db86993f73e6b74a57d8640b69f7e259', '0x5a4eee58744d1430876d5ca93cab5ccb763c037d', '0x79f2188ef9350a1dc11a062cca0abe90684b0197', '0x76bf500b6305dc4ea851384d3d5502f1c7a0ed44', '0x6b69b755c629590ed59618a2712d8a2957ca98fc', '0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0', '0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1', '0xe3ae7c80a1b02ccd3fb0227773553aeb14e32f26', '0x5bd9af9c2506d29b6d79cb878284a270190eaeaa', '0x26a02ec47acc2a3442b757f45e0a82b8e993ce11', '0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e', '0x9c354503c38481a7a7a51629142963f98ecc12d0', '0x0c4576ca1c365868e162554af8e385dc3e7c66d9', '0x3cdd07c16614059e66344a7b579dab4f9516c0b6', '0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2', '0xf2a18f7330141ec737eb73a0a5ea8e4d7e9be7ec', '0xe11edbd5ae4fa434af7f8d7f03da1742996e7ab2', '0x8cf42b82fffa3e7714d62a2ca223acbec1eef095', '0x85b78aca6deae198fbf201c82daf6ca21942acc6', '0xf54ebff575f699d281645c6f14fe427dffe629cf', '0x01f30b7358ba51f637d1aa05d9b4a60f76dad680', '0x29c4bb7b1ebcc53e8cbd16480b5bae52c69806d3', '0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184', '0xceda2d856238aa0d12f6329de20b9115f07c366d', '0x687afb5a52a15122fd5fc54a8b52cfd58346fb0c', '0x0dc20109ea012f050beda184844c1ed5ec6da33a', '0x39878253374355dbcc15c86458f084fb6f2d6de7', '0x4b91827516f79d6f6a1f292ed99671663b09169a', '0xedf495f92c2ebdee8b797e9c503aa7a3302a9c88', '0xc4444c5d9e7c1a5a0a01c5e4b11692d589dcaf22', '0xfee31c09fa5e9cdbc1f80c90b42b58640be91ddf', '0x49674fbce040d95366604d1db3392e9bdea14d48', '0x6d416e576eecbb9f897856a7c86007905274ed04', '0xe3b3b4fc77505ecfaacf6dd21619a8cc12fcc501', '0xba0e352ab5c13861c26e4e773e7a833c3a223fe6', '0x6bac785889a4127db0e0cefee88e0a9f1aaf3cc7'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts'
) ON CONFLICT (id) DO NOTHING;

-- Origin Timelock (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-timelock',
  1,
  'event'::match_type,
  ARRAY['0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  NULL,
  'Origin Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts Sonic (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts-sonic-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x7b0383b31c7662e3f6b6e9c743bc87b93c1f4498', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0x4bc73050916e6d1738286d8863f8fdcffaa879f8', '0x06f172e6852085eca886b7f9fd8f7b21db3d2c40', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21', '0x596b0401479f6dfe1caf8c12838311fee742b95c', '0xbe19cc5654e30daf04ad3b5e06213d70f4e882ee', '0x31a91336414d3b955e494e7d485a6b06b55fc8fb', '0x2f872623d1e1af5835b08b0e49aad2d81d649d30', '0x38b654d7859dab79935c9cf99267392c06d254cf'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts Sonic'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Chain SFC (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-chain-sfc-sonic',
  146,
  'event'::match_type,
  ARRAY['0xfc00face00000000000000000000000000000000'],
  ARRAY['0xcd35267e7654194727477d6c78b541a553483cff7f92a055d17868d3da6e953e', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x49bca1ed2666922f9f1690c26a569e1299c2a715fe57647d77e81adfabbf25bf', '0xac4801c32a6067ff757446524ee4e7a373797278ac3c883eac5c693b4ad72e47', '0x047575f43f09a7a093d94ec483064acfc61b7e25c0de28017da442abf99cb917'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Chain SFC'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Multisig (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-multisig-sonic',
  146,
  'event'::match_type,
  ARRAY['0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Timelock (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-timelock-sonic',
  146,
  'event'::match_type,
  ARRAY['0x31a91336414d3b955e494e7d485a6b06b55fc8fb'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Base Multisig (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'base-multisig-base',
  8453,
  'event'::match_type,
  ARRAY['0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Base Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Base Timelock (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'base-timelock-base',
  8453,
  'event'::match_type,
  ARRAY['0xf817cb3092179083c48c014688d98b72fb61464f'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Base Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts Base (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x3b56c09543d3068f8488ed34e6f383c3854d2bc1', '0x80c864704dd06c3693ed5179190786ee38acf835', '0xf611cc500eee7e4e4763a05fe623e2363c86d2af', '0x9cfcaf81600155e01c63e4d2993a8a81a8205829'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts Base'
) ON CONFLICT (id) DO NOTHING;

-- Curve Aragon Voting (51%) (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-aragon-voting-51',
  1,
  'event'::match_type,
  ARRAY['0xe478de485ad2fe566d49342cbd03e49ed7db3356'],
  ARRAY['0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394', '0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab', '0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e', '0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50', '0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375', '0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580', '0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9', '0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'Curve Aragon Voting (51%)'
) ON CONFLICT (id) DO NOTHING;

-- Curve Aragon Voting (60%) (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-aragon-voting-60',
  1,
  'event'::match_type,
  ARRAY['0xbcff8b0b9419b9a88c44546519b1e909cf330399'],
  ARRAY['0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394', '0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab', '0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e', '0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50', '0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375', '0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580', '0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9', '0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'Curve Aragon Voting (60%)'
) ON CONFLICT (id) DO NOTHING;

-- OETH Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-burn',
  1,
  'event'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Burn'
) ON CONFLICT (id) DO NOTHING;

-- OETH Buyback (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-buyback',
  1,
  'event'::match_type,
  ARRAY['0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2'],
  ARRAY['0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787', '0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743', '0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df', '0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Buyback'
) ON CONFLICT (id) DO NOTHING;

-- OETH Compound Staking SSV - Suicide Refund Received (chain 1) [trace]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-compound-staking-ssv-suicide-refund-received-trace',
  1,
  'trace'::match_type,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['suicide'],
  NULL,
  NULL,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Compound Staking SSV - Suicide Refund Received'
) ON CONFLICT (id) DO NOTHING;

-- OETH Compound Staking SSV Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-compound-staking-ssv-strategy',
  1,
  'event'::match_type,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  ARRAY['0xb7523e03ed4a74718427c422a01fee1138835adb5bd592240f30bd8b5e1b929a', '0xed2528338eefb63fd1860078b91e35106bc25e3fd528634d180f662582fe5ec1', '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xae0e4f727389efd70d748d667436e0264f370ae498b339b713797dbab57b12ff', '0xaca97428a1d7f2b7c4cee2fbe4feda457e132b404b0c9c3ff73bf7a988d889a8', '0xce77f85e30b0e6df0d12527ddf038f900fdeda0eeda4284c52be47b05de31a97', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x83f29c79feb71f8fba9d0fbc4ba5f0982a28b6b1e868b3fc50e6400d100bca0f', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x50837f89f5e75ae0a7bcc858f53ea15fa398dc007fd52cbfe4683ae9a6c2d722', '0x63d54ea43f163d6e28fc23abec67eb7c3294e7e6f0620955a73cd8d17c7367f4', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0xb8318df57b70f6381fb18aaf762e33efa2cc92627aae83d417f6710e1415d8d8', '0x8142f1367675d1a37dc1aa31258c38b05f5348de55b799764472d94ccb4a71f4', '0x8dd83105dbd4263d41c76e5d414905babdd3f035bd2031f6ce8895715595979c', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Compound Staking SSV Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Contract (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-contract',
  1,
  'event'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Contract'
) ON CONFLICT (id) DO NOTHING;

-- OETH Curve AMO Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-curve-amo-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  ARRAY['0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768', '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c', '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0', '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e', '0xa2b71ec6df949300b59aab36b55e189697b750119dd349fcfa8c0f779e83c254', '0x46e22fb3709ad289f62ce63d469248536dbc78d82b84a3d7e74ad606dc201938', '0x878eb36b3f197f05821c06953d9bc8f14b332a227b1e26df06a4215bbfe5d73f', '0xa8715770654f54603947addf38c689adbd7182e21673b28bcf306a957aaba215'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Curve AMO Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-curve-amo-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  true,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OETH Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  true,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking - Suicide Refund Received (chain 1) [trace]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-suicide-refund-received-trace',
  1,
  'trace'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['suicide'],
  NULL,
  NULL,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Native Staking - Suicide Refund Received'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  ARRAY['0x7a745a2c63a535068f52ceca27debd5297bbad5f7f37ec53d044a59d0362445d', '0xbe7040030ff7b347853214bf49820c6d455fedf58f3815f85c7bc5216993682b', '0x80d022717ea022455c5886b8dd8a29c037570aae58aeb4d7b136d7a10ec2e431', '0x6aa7e30787b26429ced603a7aba8b19c4b5d5bcf29a3257da953c8d53bcaa3a6', '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0x958934bb53d6b4dc911b6173e586864efbc8076684a31f752c53d5778340b37f', '0xcb8d24e46eb3c402bf344ee60a6576cba9ef2f59ea1af3b311520704924e901a', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x83f29c79feb71f8fba9d0fbc4ba5f0982a28b6b1e868b3fc50e6400d100bca0f', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x6aecca20726a17c1b81989b2fd09dfdf636bae9e564d4066ca18df62dc1f3dc2', '0x8c2e15303eb94e531acc988c2a01d1193bdaaa15eda7f16dda85316ed463578d', '0xacd38e900350661e325d592c959664c0000a306efb2004e7dc283f44e0ea0423', '0xe765a88a37047c5d793dce22b9ceb5a0f5039d276da139b4c7d29613f341f110', '0xe26b067424903962f951f568e52ec9a3bbe1589526ea54a4e69ca6eaae1a4c77', '0x3329861a0008b3348767567d2405492b997abd79a088d0f2cef6b1a09a8e7ff7', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Native Staking Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  ARRAY['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Native Staking Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Vault (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-vault-1',
  1,
  'event'::match_type,
  ARRAY['0x39254033945aa2e4809cc2977e7087bee48bd7ab'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Vault'
) ON CONFLICT (id) DO NOTHING;

-- OETH Vault (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-vault-2',
  1,
  'event'::match_type,
  ARRAY['0x39254033945aa2e4809cc2977e7087bee48bd7ab'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Vault'
) ON CONFLICT (id) DO NOTHING;

-- OETH Zapper (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-zapper',
  1,
  'event'::match_type,
  ARRAY['0xda0485c1e74a7ef690e99d8286c243942edaa07b'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Zapper'
) ON CONFLICT (id) DO NOTHING;

-- OETH/ETH Price Feed (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-eth-price-feed',
  1,
  'event'::match_type,
  ARRAY['0x703118c4cbcccbf2ab31913e0f8075fbbb15f563'],
  ARRAY['0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH/ETH Price Feed'
) ON CONFLICT (id) DO NOTHING;

-- WOETH Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'woeth-burn',
  1,
  'event'::match_type,
  ARRAY['0xdcee70654261af21c44c093c300ed3bb97b78192'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'WOETH Burn'
) ON CONFLICT (id) DO NOTHING;

-- Chainlink Keeper (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'chainlink-keeper',
  1,
  'event'::match_type,
  ARRAY['0x7b3ec232b08bd7b4b3305be0c044d907b2df960b'],
  ARRAY['0xcaacad83e47cc45c280d487ec84184eee2fa3b54ebaa393bda7549f13da228f6', '0x91cb3bb75cfbd718bbfccc56b7f53d92d7048ef4ca39a3b7b7c6d4af1f791181', '0xafd24114486da8ebfc32f3626dada8863652e187461aa74d4bfa734891506203', '0xf3b5906e5672f3e524854103bcafbbdba80dbdfeca2c35e116127b1060a68318'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Chainlink Keeper'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- OGN Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-burn',
  1,
  'event'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'OGN Burn'
) ON CONFLICT (id) DO NOTHING;

-- OGN Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  true,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'OGN Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OGN Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  true,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'OGN Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OGV Migration (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogv-migration-1',
  1,
  'event'::match_type,
  ARRAY['0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  ARRAY['0xb5895e6e094fe35ea6fb07a0d870556bd8873cb5b013db35577ac4b8fc9ba911', '0x9c1f21412e7678ca4f1e877049ce3e4db3d039e316e6b55b1de2aef667ae4996'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'OGV Migration'
) ON CONFLICT (id) DO NOTHING;

-- OGV Migration (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogv-migration-2',
  1,
  'event'::match_type,
  ARRAY['0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  ARRAY['0x4bd04f3440c9bf56a25f7b9e1ac75a9803bd83123a127cf9748129c938630b39'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OGV Migration'
) ON CONFLICT (id) DO NOTHING;

-- Origin Rewards (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-rewards-1',
  1,
  'event'::match_type,
  ARRAY['0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'],
  ARRAY['0xe261f91b5c3d9f16ed2268171bcd375f4aa1fe4b244cfe2e54a7d21be4735d46', '0x41ad0a33748dcbf4495041d0518e1204c1d5f0d65e7dccb51877235361e75f4a'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Rewards'
) ON CONFLICT (id) DO NOTHING;

-- Origin Rewards (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-rewards-2',
  1,
  'event'::match_type,
  ARRAY['0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'],
  ARRAY['0x9026b1dc1bd4688af8f4998f8cacc713a53fba753294da0efe4849a25c26023e'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Origin Rewards'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Curve (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-curve',
  1,
  'event'::match_type,
  ARRAY['0x9f4308cdfa4d02c045bc8bd82864013b62d516bb', '0x8a8809d67e3193486dcf94ad023978cbceed1723'],
  ARRAY['0x29517452b3d8f353a0d81b89ef1eb2c73ce0fc391e9d8e46c2c11c068d73bbe5', '0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Curve'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Merkl (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-merkl',
  1,
  'event'::match_type,
  ARRAY['0x0fc66355b681503efee7741bd848080d809fd6db'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Merkl'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Registry (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-registry',
  1,
  'event'::match_type,
  ARRAY['0xaa8af8db4b6a827b51786334d26349eb03569731'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'Pool Booster Registry'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster-sonic',
  146,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster-base',
  8453,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Merkl (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-merkl-base-base',
  8453,
  'event'::match_type,
  ARRAY['0x1adb902ece465ca681c66187627a622a631a0a63'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Merkl (Base)'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Registry (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-registry-base-base',
  8453,
  'event'::match_type,
  ARRAY['0x157f0b239d7f83d153e6c95f8ad9d341694376e3'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'Pool Booster Registry (Base)'
) ON CONFLICT (id) DO NOTHING;

-- OS Burn (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-burn-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Burn'
) ON CONFLICT (id) DO NOTHING;

-- OS Contract (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-contract-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Contract'
) ON CONFLICT (id) DO NOTHING;

-- OS Vault (chain 146) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-vault-1-sonic',
  146,
  'event'::match_type,
  ARRAY['0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'OS Vault'
) ON CONFLICT (id) DO NOTHING;

-- OS Vault (chain 146) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-vault-2-sonic',
  146,
  'event'::match_type,
  ARRAY['0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Vault'
) ON CONFLICT (id) DO NOTHING;

-- OS Zapper (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-zapper-sonic',
  146,
  'event'::match_type,
  ARRAY['0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Zapper'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Error Trace (chain 146) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-error-trace-trace-1-sonic',
  146,
  'trace'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  true,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'Sonic Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Error Trace (chain 146) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-error-trace-trace-2-sonic',
  146,
  'trace'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  true,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'Sonic Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Wrapped OS Burn (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wrapped-os-burn-sonic',
  146,
  'event'::match_type,
  ARRAY['0x9f0df7799f6fdad409300080cff680f5a23df4b1'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'Wrapped OS Burn'
) ON CONFLICT (id) DO NOTHING;

-- Aave Governance (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aave-governance',
  1,
  'event'::match_type,
  ARRAY['0x9aee0b04504cef83a65ac3f0e838d0593bcb2bc7'],
  ARRAY['0xe2470238697bf7475f7230e5f3d01e088062f9610e00bcfb223e3a774949a09a', '0x5b81b8e66a81fbba6ded220cf668cb5da777acaa83cafe789c2699cad0efd808', '0x3d1394ba0f6fca9c1e344f10a3efe1bfca63bc591232bb0d76755690f409450c', '0x064d28d3d3071c5cbc271a261c10c2f0f0d9e319390397101aa0eb23c6bad909', '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x9c687134d572ff69f3e23f40470562650574c5c7cab9f535268763b2d00da65b', '0xfc61eef8f2b4da4ee7bfb9f335f064e2a35a3f6e8e65c3168eafe813aafe4c58', '0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c', '0xcc914becfa276bbc067049bf8db2d34ebbdc1bafa851e4d4936aaed376c08dbe', '0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f', '0x2bed878481293fc7587c48352c8b09aeeca52bed666011d7f916706ec72d6d6d', '0xe39e7fc9f2013b8ab01110f66610f9fb8675d3126e69b3752f0084afc72be19a', '0x918b5bd4499a75f73bb64f14ae0254255f5421d0ecc4dd853c7bfdd7cf65e8fd', '0xf78ab0f6be87fe178c5f1b1fc0a1da52c65e7ac9a866215631dec7ffb1bd108d', '0x45f1db29750f423920a6edede3a80ea19ceb9de3eabc072078eb539ca348dca0', '0xa743f6cc30e98a5cb8e1148f36749c33167ec405cf4262bf6c7ae093d2a6c63f', '0x5e1f23fe5aaf4ee57082b5f445e00d5a47343503b24ab1532a6c8cd15ba97008'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'medium'::severity_level,
  NULL,
  'Aave Governance'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-burn',
  1,
  'event'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Burn'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Buyback (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-buyback',
  1,
  'event'::match_type,
  ARRAY['0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab'],
  ARRAY['0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787', '0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743', '0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df', '0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Buyback'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Contract (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-contract',
  1,
  'event'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Contract'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Curve AMO Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-curve-amo-strategy',
  1,
  'event'::match_type,
  ARRAY['0x26a02ec47acc2a3442b757f45e0a82b8e993ce11'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  true,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  true,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Gauntlet Prime USDC Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-gauntlet-prime-usdc-strategy',
  1,
  'event'::match_type,
  ARRAY['0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Gauntlet Prime USDC Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Gauntlet Prime USDT Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-gauntlet-prime-usdt-strategy',
  1,
  'event'::match_type,
  ARRAY['0xe3ae7c80a1b02ccd3fb0227773553aeb14e32f26'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Gauntlet Prime USDT Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Maker Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-maker-strategy',
  1,
  'event'::match_type,
  ARRAY['0x6b69b755c629590ed59618a2712d8a2957ca98fc'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Maker Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Meta Morpho Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-meta-morpho-strategy',
  1,
  'event'::match_type,
  ARRAY['0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Meta Morpho Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho Aave Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-aave-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Morpho Aave Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho Aave Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-aave-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  ARRAY['0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Morpho Aave Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho V2 Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-v2-strategy',
  1,
  'event'::match_type,
  ARRAY['0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Morpho V2 Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Sky Savings Rate Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-sky-savings-rate-strategy',
  1,
  'event'::match_type,
  ARRAY['0x5bd9af9c2506d29b6d79cb878284a270190eaeaa'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Sky Savings Rate Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Vault (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-vault-1',
  1,
  'event'::match_type,
  ARRAY['0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Vault'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Vault (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-vault-2',
  1,
  'event'::match_type,
  ARRAY['0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Vault'
) ON CONFLICT (id) DO NOTHING;

-- WOUSD Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wousd-burn',
  1,
  'event'::match_type,
  ARRAY['0xd2af830e8cbdfed6cc11bab697bb25496ed6fa62'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'WOUSD Burn'
) ON CONFLICT (id) DO NOTHING;

-- primeETH LRT Deposit Pool (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'primeeth-lrt-deposit-pool',
  1,
  'event'::match_type,
  ARRAY['0xa479582c8b64533102f6f528774c536e354b8d32'],
  ARRAY['0x07c31fccf51996f0f4ea01c3a55191786b3a8cd89f696db4d42adaa99b0e15f1', '0x4ac5df40d910feab74f02c4430568f99e711257906dd0df11643df22f2ee3cf6', '0x8b0422d41caf5eb583695377e98b5041a1d241a7c80483cf182b1311c48c93b7', '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', '0x44a9f72c31db7b99a131a49de95fe2420c60e9fe9bff0a1a13d47b4af14566b4', '0x1bba2f1175afe384c3b2efde45f19740b744459c61a7700994196fe4d84af176', '0xd402f64df01ef62b7343cb5309018377088f22dc1b81a5378ce7f2575114afe4', '0xb17adb7f863ad4dced68bd4045e81e087cb8c5b536bf2dbda6c8176e5fc593b9', '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0x9cf19cefd9aab739c33b95716ee3f3f921f219dc6d7aae25e1f9497b37889150', '0x8188e2b4d95f73db30690b4103c71159349bb897df928902c6330ef99e45fef3', '0x92072c627ec1da81f8268b3cfb3c02bbbeedc12c21134faf4457469147619947'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'primeETH',
  'low'::severity_level,
  NULL,
  'primeETH LRT Deposit Pool'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome CL Pools (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-cl-pools-base',
  8453,
  'event'::match_type,
  ARRAY['0x6446021f4e396da3df4235c62537431372195d38'],
  ARRAY['0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde', '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c', '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"op":"OR","conditions":[{"field":"amount0","op":"gte","value":"100000000000000000"},{"field":"amount1","op":"gte","value":"100000000000000000"}]}'::jsonb,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Aerodrome CL Pools'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome Incentives (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-incentives-base',
  8453,
  'event'::match_type,
  ARRAY['0x685ce0e36ca4b81f13b7551c76143d962568f6dd', '0x1f6ab4aa92aa7f95b7eff5aa507119472ad1c5d3'],
  ARRAY['0x52977ea98a2220a03ee9ba5cb003ada08d394ea10155483c95dc2dc77a7eb24b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'highlight'::severity_level,
  NULL,
  'Aerodrome Incentives'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome vAMM Pools (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-vamm-pools-base',
  8453,
  'event'::match_type,
  ARRAY['0x8ea4c49b712217fd6e29db920e3dd48287a0d50d', '0x6fb655476fdcfb9712dd200308d941a1c6d1119e'],
  ARRAY['0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2', '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Aerodrome vAMM Pools'
) ON CONFLICT (id) DO NOTHING;

-- Bridged WOETH (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'bridged-woeth-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xd8724322f44e5c58d7a815f542036fb17dbbf839'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Bridged WOETH (Base)'
) ON CONFLICT (id) DO NOTHING;

-- Super OETH Base Error Trace (chain 8453) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'super-oeth-base-error-trace-trace-1-base',
  8453,
  'trace'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  true,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'Super OETH Base Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Super OETH Base Error Trace (chain 8453) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'super-oeth-base-error-trace-trace-2-base',
  8453,
  'trace'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  true,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'Super OETH Base Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Aerodrome AMO (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-aerodrome-amo-base',
  8453,
  'event'::match_type,
  ARRAY['0xf611cc500eee7e4e4763a05fe623e2363c86d2af'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x1530ec748a27514ffab0987654233a80256393e127bdf02d94e32ff3c7148ec6', '0xede5d7a610050b00dde41dd385fe2d91a558dde29318267aa4e011678b58cfc5', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x0d0d42e29eda809becae4f120dfbc3799e17df829fa338f8035c724579423b89', '0xfb25072e740f40f37c0adb21abfa08b090c754a216aa3dce33b68fab089eff91', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0xab1ece054738c773b84a8a32f5f969323c50dc7e28634302f91c7b75cb838782', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Aerodrome AMO'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Bridged WOETH Strategy (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-bridged-woeth-strategy-base',
  8453,
  'event'::match_type,
  ARRAY['0x80c864704dd06c3693ed5179190786ee38acf835'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x5066a7b9bf5907d8b921adeaade475273e40a7302cab0e838ef9fa2094b06b7f', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x688768fc37ada60fd073f86fafc8d5aa7fe9d86750ddf224bc0366812c086fe8', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Bridged WOETH Strategy'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Burn (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-burn-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Burn'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Contract (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-contract-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Contract'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Curve AMO Strategy (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-curve-amo-strategy-base',
  8453,
  'event'::match_type,
  ARRAY['0x9cfcaf81600155e01c63e4d2993a8a81a8205829'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x9c922f6d0c990b250e9dd0a427a5c8da7f44b960f697fecb31cbbd8ba79ec8c2', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Vault (chain 8453) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-vault-1-base',
  8453,
  'event'::match_type,
  ARRAY['0x98a0cbef61bd2d21435f433be4cd42b56b38cc93'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'superOETHb Vault'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Vault (chain 8453) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-vault-2-base',
  8453,
  'event'::match_type,
  ARRAY['0x98a0cbef61bd2d21435f433be4cd42b56b38cc93'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Vault'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Zapper (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-zapper-base',
  8453,
  'event'::match_type,
  ARRAY['0x3b56c09543d3068f8488ed34e6f383c3854d2bc1'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"amount","op":"gte","value":"100000000000000000"}'::jsonb,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Zapper'
) ON CONFLICT (id) DO NOTHING;

-- wOETH Exchange Rate Oracle (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'woeth-exchange-rate-oracle-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xe96eb1eda83d18cbac224233319fa5071464e1b9'],
  ARRAY['0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'wOETH Exchange Rate Oracle (Base)'
) ON CONFLICT (id) DO NOTHING;

-- wsuperOETHb Burn (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wsuperoethb-burn-base',
  8453,
  'event'::match_type,
  ARRAY['0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'wsuperOETHb Burn'
) ON CONFLICT (id) DO NOTHING;

-- OGN Staking (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-staking',
  1,
  'event'::match_type,
  ARRAY['0x63898b3b6ef3d39332082178656e9862bee45c57'],
  ARRAY['0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f', '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724', '0x2720efa4b2dd4f3f8a347da3cbd290a522e9432da9072c5b8e6300496fdde282', '0x05b744e3e9358bc00ba3cc0c6606a4d6536134dba00b2d2ee4b5de169acd6427'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'xOGN',
  'low'::severity_level,
  NULL,
  'OGN Staking'
) ON CONFLICT (id) DO NOTHING;

COMMIT;
