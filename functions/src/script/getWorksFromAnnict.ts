import { initializeProject } from './helper'
initializeProject('prod')

import { SetWorkService } from '../service'
import { Season } from '../enum/season'
import * as fs from 'fs'
import { sleep } from '../common/sleep'

type Params = {
  year: number
  seasons: Season[]
}

const main = async () => {
  const service = new SetWorkService()

  const list: Params[] = []
  list.push({ year: 2021, seasons: ['spring', 'summer'] })
  // for (let year = 2000; year <= 2020; year++) {
  //   list.push({ year, seasons: allSeasons })
  // }

  const failedWorkIDs: string[] = []

  for (const params of list) {
    for (const season of params.seasons) {
      const result = await service.execute(params.year, season, { skipToGetAdditionalImage: false, registerToAlgolia: true })
      if (result.isFailure) {
        console.log(season, params.year, 'failure')
        throw result.error
      }

      failedWorkIDs.push(...result.value.setImageFailedWorkIDs)
      await sleep(10 * 1000)
    }
  }

  if (failedWorkIDs.length > 0) {
    fs.writeFileSync('./src/script/setWorksResult.json', JSON.stringify({ failedWorkIDs, list }, null, 2))
  }

  process.exit(0)
}

main()
