import { initializeProject } from "../helper"
initializeProject('dev')

import { AmazonRepository } from '../../repository'

const main = async () => {
  const repo = new AmazonRepository()
  const url = await repo.fetchImageURL('かぐや様は告らせたい〜天才たちの恋愛頭脳戦〜')
  console.log(url)
  process.exit(0)
}

main()
