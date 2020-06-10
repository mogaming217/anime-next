import { AnnictRepository, WorkRepository } from "../../repository"

describe('AnnictRepository', () => {
  it('fetchWorks', async () => {
    const repo = new AnnictRepository()
    const result = await repo.fetchWorks()
    if (!result.isFailure) {
      const workRepo = new WorkRepository()
      await workRepo.save(result.value)
      console.log('saved!')
    }
  })
})
