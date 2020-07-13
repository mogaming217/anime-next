import { config } from "firebase-functions"
import { initializeApp } from "firebase-admin"
initializeApp(config().firebase)

export * from './eventHandler'
