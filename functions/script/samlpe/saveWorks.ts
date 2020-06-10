import { initializeProject } from "../helper"
initializeProject('dev')

import { AnnictRepository, WorkRepository } from '../../src/repository'

const main = async () => {
  const repo = new AnnictRepository()
  const result = await repo.fetchWorks()
  if (!result.isFailure) {
    const workRepo = new WorkRepository()
    console.log(result.value);
    await workRepo.save(result.value)
    console.log('saved!')
  }

  process.exit(0)
}

main()
