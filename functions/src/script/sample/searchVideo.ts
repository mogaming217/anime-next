import { initializeProject } from "../helper"
initializeProject('dev')

import { AmazonRepository } from '../../repository'

const main = async () => {
  const repo = new AmazonRepository()
  // const url = await repo.fetchImageURL('七つの大罪 戒めの復活 (第2期)')
  const url = await repo.fetchImageURL('https://www.amazon.co.jp/dp/B07D7LF4KP?tag=seiyaorz-22&linkCode=osi&th=1&psc=1')
  console.log(url)
  process.exit(0)
}

main()
