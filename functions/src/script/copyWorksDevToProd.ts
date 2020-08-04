import { initializeProject } from "./helper"
const devApp = initializeProject('dev')
const prodApp = initializeProject('prod')

import { findInBatch } from "../helper/firestore"
import { sleep } from "../common/sleep"

const main = async () => {
  let index = 0
  await findInBatch(devApp.firestore().collection('works'), 100, async docs => {
    await Promise.all(docs.map(doc => {
      prodApp.firestore().collection('works').doc(doc.id).set(doc.data()!)
    }))
    await sleep(1000)
    console.log(index++)
  })
  process.exit(0)
}

main()
