import { initializeProject } from '../helper'
initializeProject('dev')

import { AmazonRepository } from '../../repository'

const main = async () => {
  const repo = new AmazonRepository()
  const item = await repo.fetchItemInfo('鬼滅の刃 マンガ 8')
  console.log(item)
  process.exit(0)
}

main()
