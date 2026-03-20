// @ts-expect-error pg typings are not configured in this repo
import pg from 'pg'

const { Pool } = pg

let pool: InstanceType<typeof Pool> | null = null

function getConnectionString() {
  if (process.env.DB_URL) return process.env.DB_URL

  const host = process.env.DB_HOST ?? 'localhost'
  const port = process.env.DB_PORT ?? '23798'
  const database = process.env.DB_NAME ?? 'squid'
  const user = process.env.DB_USER ?? 'postgres'
  const password = process.env.DB_PASS ?? 'postgres'

  return `postgres://${user}:${password}@${host}:${port}/${database}`
}

export function getSquidDbPool(): InstanceType<typeof Pool> {
  if (!pool) {
    pool = new Pool({ connectionString: getConnectionString() })
  }
  return pool
}
