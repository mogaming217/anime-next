import { initializeProject } from "./helper"
import { SearchRepository, WorkRepository } from "../repository"
import { findInBatch } from "../helper/firestore"
import { compactMap } from "../helper/array"
import { sleep } from "../common/sleep"
const app = initializeProject('prod')

const main = async () => {
  const db = app.firestore()
  const searchRepo = new SearchRepository(db)
  await searchRepo.setWorkSettings()

  const workRepo = new WorkRepository(db)
  const query = workRepo.worksRef
  let index = 0
  await findInBatch(query, 100, async snapshots => {
    const works = compactMap(snapshots, s => workRepo.decode(s))
    await searchRepo.registerWorks(works)
    await sleep(2000)
    console.log('register', index++)
  })

  process.exit(0)
}

main()
