import { initializeProject } from './helper'
const app = initializeProject('dev')

const userID = 'EOeTi8l3s6aFO0xjtFcYYyvSAnJ3'

const main = async () => {
  const auth = app.auth()
  const user = await auth.getUser(userID)
  const currentClaims = user.customClaims || {}
  const newClaims = Object.assign(currentClaims, { role: 'admin' })
  await auth.setCustomUserClaims(userID, newClaims)
}

main()
