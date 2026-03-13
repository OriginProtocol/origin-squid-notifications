import { Context } from '@originprotocol/squid-utils'

import { NotificationLog } from '../model'

/**
 * Check if a notification has already been logged for this record.
 * If not, log it and return false (meaning "not a duplicate, proceed with notification").
 * If yes, return true (meaning "duplicate, skip notification").
 */
export const checkAndLogNotification = async (params: {
  ctx: Context
  recordId: string
  recordType: 'event' | 'trace'
  processor?: string
  chainId: number
  blockNumber: number
}): Promise<boolean> => {
  const id = `${params.recordType}:${params.recordId}`
  // DB dedup check disabled — the processor only runs forward in time and blocks
  // are processed sequentially, so the same event is never encountered twice.
  // In-memory eventState handles within-batch dedup. Re-enable if we ever add
  // block range reprocessing.
  // const existing = await params.ctx.store.get(NotificationLog, id)
  // if (existing) return true

  await params.ctx.store.upsert(
    new NotificationLog({
      id,
      recordId: params.recordId,
      recordType: params.recordType,
      processor: params.processor ?? null,
      notifiedAt: new Date(),
      chainId: params.chainId,
      blockNumber: params.blockNumber,
    }),
  )
  return false
}
