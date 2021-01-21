import * as functions from 'firebase-functions'

export interface EnvorinmentVariables {
  annict: {
    token: string
  }
  amazon: {
    access: string
    secret: string
  }
  algolia: {
    indexprefix: string
    id: string
    key: string
  }
}

let config = functions.config()
if (Object.keys(config).length === 0) {
  if (!process.env.NODE_ENV || process.env.GCLOUD_PROJECT === 'animenextdev') {
    config = require('../env/dev.json')
  } else if (process.env.GCLOUD_PROJECT === 'animenextprod') {
    config = require('../env/prod.json')
  }
}

export const env = config as EnvorinmentVariables
