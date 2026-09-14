import axios from 'axios'
import { Chain } from 'viem'

import { Log, Trace, Transaction, jsonify } from '@originprotocol/squid-utils'

import { Severity, Topic } from './const'
import { explorerUrl } from './format'

if (!process.env.ONCALL_WEBHOOK_URL) {
  throw new Error('Env ONCALL_WEBHOOK_URL must be set.')
}

const oncallWebhookUrl = process.env.ONCALL_WEBHOOK_URL

export interface OncallParams {
  chain: Chain
  topic: Topic
  severity: Severity
  name?: string
  transaction?: Transaction
  trace?: Trace
  functionName?: string
  functionData?: unknown
  eventName?: string
  log?: Log
  data?: unknown
}

let messageQueue: Map<string, any> = new Map()

export const processOncallQueue = async () => {
  for (const message of messageQueue.values()) {
    await sendMessage(message)
  }
  messageQueue.clear()
}

const sendMessage = async (params: any) => {
  await axios.post(oncallWebhookUrl, JSON.parse(jsonify(params)))
}

const joinParts = (parts: (string | undefined)[]) => parts.filter((part) => part).join(' · ')

export const shapeOncallAlert = (id: string, { chain, ...params }: OncallParams) => {
  const block = params.transaction?.block.height ?? params.trace?.block.height ?? params.log?.block.height
  const txHash = params.transaction?.hash ?? params.trace?.transaction?.hash ?? params.log?.transactionHash
  return {
    ...params,
    chainId: chain.id,
    title: joinParts([params.severity.toUpperCase(), params.topic, params.name]),
    message: joinParts([
      chain.name,
      block === undefined ? undefined : `block ${block}`,
      params.functionName ?? params.eventName,
    ]),
    alert_uid: `${chain.id}-${id}`,
    link_to_upstream_details: txHash ? `${explorerUrl(chain)}/tx/${txHash}` : undefined,
  }
}

export const notifyOncall = (id: string, params: OncallParams) => {
  messageQueue.set(id, shapeOncallAlert(id, params))
}
