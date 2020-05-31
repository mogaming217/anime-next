import * as functions from 'firebase-functions'

export interface EnvorinmentVariables {
  annict: {
    apiKey: string
  }
}

export const env = functions.config() as EnvorinmentVariables
