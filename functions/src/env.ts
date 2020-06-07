import * as functions from 'firebase-functions'

export interface EnvorinmentVariables {
  annict: {
    token: string
  }
}

let config: any
if (process.env.NODE_ENV === 'test') {
  // FIXME: とりあえずdev環境をロード
  config = require('../env/dev.json')
} else {
  config = functions.config()
}

export const env = config as EnvorinmentVariables
