import { initializeProject } from './helper'
const app = initializeProject('prod')

import { WorkRepository } from '../repository'
import { compactMap } from '../helper/array'
import Axios from 'axios'
import * as path from 'path'
import * as fs from 'fs'
import { findInBatch } from '../helper/firestore'

const main = async () => {
  const firestore = app.firestore()
  const storage = app.storage()
  const bucket = storage.bucket(`${process.env.GCLOUD_PROJECT}.appspot.com`)

  const workRepo = new WorkRepository(firestore)

  await findInBatch(firestore.collection('works'), 100, async docs => {
    const works = compactMap(docs, doc => workRepo.decode(doc))
    const filtered = works.filter(work => work.imageURL?.startsWith('http://'))

    for (const work of filtered) {
      try {
        const imgBuffer = await Axios.get(work.imageURL!, { responseType: 'arraybuffer' })
        const localFileName = `${work.id}.jpg`
        const localPath = path.resolve(__dirname, `./tmp/${localFileName}`)
        fs.writeFileSync(localPath, Buffer.from(imgBuffer.data))

        const dest = `works/${work.id}/ogp.jpg`
        await bucket.upload(localPath, {
          destination: dest,
          predefinedAcl: 'publicRead',
        })

        const newImageURL = `https://storage.googleapis.com/${bucket.name}/${dest}`
        work.imageURL = newImageURL
        await workRepo.updateImageURL(work)
      } catch (error) {
        console.log(`failed`, work.id, error.message)

        if (error.message?.includes('404')) {
          work.imageURL = null
          await workRepo.updateImageURL(work)
        }
      }
    }
  })

  process.exit(0)
}

main()
