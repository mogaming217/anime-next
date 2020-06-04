import { AnnictRepository } from "../../repository"

describe('AnnictRepository', () => {
  it('sample', async () => {
    const repo = new AnnictRepository()
    const data = await repo.fetchWorks()
    console.log(JSON.stringify(data, null, 2))
  })
})
