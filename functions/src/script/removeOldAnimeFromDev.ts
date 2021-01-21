import { initializeProject } from './helper'
const app = initializeProject('dev', 'dev')

import { SearchRepository } from '../repository'
import { findInBatch } from '../helper/firestore'
import { sleep } from '../common/sleep'

const main = async () => {
  const writer = app.firestore().bulkWriter()
  const searchRepo = new SearchRepository(app.firestore())

  for (let year = 2000; year < 2019; year++) {
    const query = app.firestore().collection('works').where('year', '==', year)
    await findInBatch(query, 100, async snapshots => {
      snapshots.forEach(s => writer.delete(s.ref))
      await searchRepo.workIndex.deleteObjects(snapshots.map(s => s.id))
      console.log(year, snapshots.length)
      await sleep(1000)
    })
  }

  await writer.close()
  process.exit(0)
}

main()
