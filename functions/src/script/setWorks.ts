import { initializeProject } from "./helper"
initializeProject('dev')

import { SetWorkService } from '../service'
import { Season, allSeasons } from "../enum/season"
import * as fs from 'fs'

type Params = {
  year: number,
  seasons: Season[]
}

const main = async () => {
  const service = new SetWorkService()

  const list: Params[] = []
  for (let year = 2000; year < 2006; year++) {
    list.push({ year, seasons: allSeasons })
  }

  const failedWorkIDs: string[] = []

  for (const params of list) {
    for (const season of params.seasons) {
      const result = await service.execute(params.year, season)
      if (result.isFailure) {
        console.log(season, params.year, 'failure')
        throw result.error
      }

      failedWorkIDs.push(...result.value.setImageFailedWorkIDs)
    }
  }

  if (failedWorkIDs.length > 0) {
    fs.writeFileSync('./src/script/setWorksResult.json', JSON.stringify({ failedWorkIDs, list }, null, 2))
  }

  process.exit(0)
}

main()