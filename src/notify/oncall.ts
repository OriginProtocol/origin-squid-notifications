import axios from 'axios'

import { jsonify } from '../utils/jsonify'

if (!process.env.ONCALL_WEBHOOK_URL) {
  throw new Error('Env ONCALL_WEBHOOK_URL must be set.')
}

const oncallWebhookUrl = process.env.ONCALL_WEBHOOK_URL

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

export const notifyOncall = (id: string, params: any) => {
  messageQueue.set(id, params)
}
