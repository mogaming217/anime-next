import * as path from 'path'
import * as admin from 'firebase-admin'

export type AppEnvironment = 'dev' | 'prod'

export const isValidAppEnv = (value: string): value is AppEnvironment => {
  return ['dev', 'prod'].includes(value)
}

export const initializeProject = (env?: AppEnvironment) => {
  const envValue = process.env.APP_ENV || env
  if (!envValue) throw new Error('No env specified. You must set APP_ENV or pass as args.')
  if (!isValidAppEnv(envValue)) throw new Error('env must be "dev" or "prod".')

  console.log(`initialize project with ${envValue}.`)
  const serviceAccountPath = path.resolve(__dirname, 'serviceAccount', `${envValue}.json`)
  const serviceAccount = require(serviceAccountPath)
  if (!serviceAccount) throw new Error('JSON credential must be placed in serviceAccount dir.')

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // if you specify databaseURL, please fix script
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  }, envValue)
}
