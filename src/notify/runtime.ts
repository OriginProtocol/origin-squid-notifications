import { AsyncLocalStorage } from 'node:async_hooks'

export interface NotificationRuntimeContext {
  mode: 'production' | 'test'
  skipDedup?: boolean
  skipOncall?: boolean
  skipLoki?: boolean
}

const runtimeStorage = new AsyncLocalStorage<NotificationRuntimeContext>()

const defaultContext: NotificationRuntimeContext = {
  mode: 'production',
}

export const getNotificationRuntimeContext = (): NotificationRuntimeContext =>
  runtimeStorage.getStore() ?? defaultContext

export const runWithNotificationRuntimeContext = async <T>(
  context: NotificationRuntimeContext,
  fn: () => Promise<T>,
): Promise<T> => {
  return await runtimeStorage.run(context, fn)
}

export const runInTestNotificationContext = async <T>(fn: () => Promise<T>): Promise<T> => {
  return await runWithNotificationRuntimeContext(
    {
      mode: 'test',
      skipDedup: true,
      skipOncall: true,
      skipLoki: true,
    },
    fn,
  )
}
