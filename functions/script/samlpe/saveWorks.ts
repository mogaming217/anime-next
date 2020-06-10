import { initializeProject } from "../helper"
initializeProject('dev')

import { AnnictRepository, WorkRepository } from '../../src/repository'

const main = async () => {
  const repo = new AnnictRepository()
  const result = await repo.fetchWorks([{ year: 2020, season: 'spring' }], 20)
  if (result.isFailure) {
    console.log(result.error)
  } else {
    const workRepo = new WorkRepository()
    await workRepo.save(result.value)
    console.log('saved!')
  }

  process.exit(0)
}

main()
