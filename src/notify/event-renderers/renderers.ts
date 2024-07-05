import { notifyForEvent } from '../event'

export const eventRenderers = new Map<string, (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>>()
export const registerEventRenderer = (
  topics: string[],
  fn: (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>,
) => {
  for (const topic of topics) {
    eventRenderers.set(topic, fn)
  }
}
