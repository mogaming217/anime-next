import { initializeProject } from "../helper"
initializeProject('dev')

import { AmazonRepository } from '../../src/repository'

const main = async () => {
  const repo = new AmazonRepository()
  const url = await repo.fetchImageURL('BNA ビー・エヌ・エー')
  console.log(url)
  process.exit(0)
}

main()
