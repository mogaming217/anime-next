import { HttpsError } from 'firebase-functions/lib/providers/https'
import { SearchRepository, WorkRepository } from '../../repository'
import { defaultFunctions } from '../function'

const functions = defaultFunctions()
export const deleteWork = functions.https.onCall(async (data, context) => {
  const role = context.auth?.token?.role
  if (role !== 'admin') throw new HttpsError('permission-denied', '権限がありません')

  const workID = data.workID as string
  const workRepo = new WorkRepository()
  const searchRepo = new SearchRepository()

  await Promise.all([workRepo.delete(workID), searchRepo.workIndex.deleteObject(workID)])
  return { success: true }
})
