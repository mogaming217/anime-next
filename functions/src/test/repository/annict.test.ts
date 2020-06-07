import { AnnictRepository } from "../../repository"

describe('AnnictRepository', () => {
  it('fetchWorks', async () => {
    const repo = new AnnictRepository()
    const data = await repo.fetchWorks()
    console.log(JSON.stringify(data, null, 2))
  })
})
