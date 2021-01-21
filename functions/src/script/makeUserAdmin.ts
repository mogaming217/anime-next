import { initializeProject } from './helper'
const app = initializeProject('prod')

const userID = 'YbUXXo91yrepFVe6swkIqdApe3A3'

const main = async () => {
  const auth = app.auth()
  const user = await auth.getUser(userID)
  const currentClaims = user.customClaims || {}
  const newClaims = Object.assign(currentClaims, { role: 'admin' })
  await auth.setCustomUserClaims(userID, newClaims)
  process.exit(0)
}

main()
