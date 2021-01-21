import { initializeProject } from './helper'
const app = initializeProject('prod')

import * as fs from 'fs'

const main = async () => {
  const firestore = app.firestore()

  let csv = ''
  for (let year = 2020; year >= 2000; year--) {
    const snap = await firestore.collection('works').where('year', '==', year).get()
    snap.docs.forEach((doc: any) => {
      csv += `${doc.data()!.title},https://animenext.jp/works/${doc.id}\n`
    })
  }

  fs.writeFileSync('./csv.csv', csv)
  process.exit(0)
}

main()
