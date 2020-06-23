import { initializeProject } from "./helper"
import { SearchRepository, WorkRepository } from "../repository"
import { findInBatch } from "../helper/firestore"
import { compactMap } from "../helper/array"
import { sleep } from "../common/sleep"
initializeProject('dev')

const main = async () => {
  const searchRepo = new SearchRepository()
  await searchRepo.setWorkSettings()

  const workRepo = new WorkRepository()
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
