import * as ff from 'firebase-functions'
import { HttpsError, CallableContext } from 'firebase-functions/lib/providers/https'
import { Logger } from '../common/logger'

const regionalFunctions = ff.region('asia-northeast1')
export const defaultFunctions = regionalFunctions

export const errorCatcher = <T, Context>(
  handler: (data: T, context: Context) => PromiseLike<any> | any
): ((data: T, context: Context) => PromiseLike<any> | any) => async (data, context) => {
  try {
    await handler(data, context)
  } catch (error) {
    if (error instanceof HttpsError) {
      throw error
    }

    let payload: any = {}
    if (isEventContext(context)) {
      payload = {
        eventID: context.eventId,
        authUid: context.auth?.uid || null,
        params: context.params || null,
      }
    } else if (isCallableContext(context)) {
      payload = {
        data, // callableなのでRequestBodyが入ってる
        authUid: context.auth?.uid || null,
      }
    }

    Logger.error(payload, error)
  }
}

const isEventContext = (context: any): context is ff.EventContext => {
  return typeof context === 'object' && context.eventId && typeof context.eventId === 'string'
}

const isCallableContext = (context: any): context is CallableContext => {
  return typeof context === 'object' && context.rawRequest
}
