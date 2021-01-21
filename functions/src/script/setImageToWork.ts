import { initializeProject } from './helper'
const app = initializeProject('prod')

import { Season, allSeasons } from '../enum/season'
import * as fs from 'fs'
import { sleep } from '../common/sleep'
import { AmazonRepository } from '../repository'

type Params = {
  year: number
  seasons: Season[]
}

const main = async () => {
  const list: Params[] = []
  for (let year = 2018; year <= 2018; year++) {
    list.push({ year, seasons: allSeasons })
  }

  const failedWorkIDs: string[] = []
  const amazonRepo = new AmazonRepository()

  for (const params of list) {
    const workResult = await app.firestore().collection('works').where('year', '==', params.year).get()
    for (const doc of workResult.docs) {
      const work = doc.data()!
      if (work.imageURL) continue
      try {
        const imageURL = await amazonRepo.fetchImageURL(work.title)
        if (imageURL) {
          console.log(doc.id)
          await doc.ref.update({ imageURL })
        }
      } catch {
        failedWorkIDs.push(doc.id)
      }

      await sleep(2 * 1000)
    }
  }

  if (failedWorkIDs.length > 0) {
    fs.writeFileSync('./src/script/setWorksResult.json', JSON.stringify({ failedWorkIDs, list }, null, 2))
  }

  process.exit(0)
}

main()
