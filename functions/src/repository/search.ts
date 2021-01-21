import { Repository } from './base'
import { Work } from '../model'
import algolia from 'algoliasearch'
import { env } from '../env'
import { handleInBatch } from '../helper/array'
import { sleep } from '../common/sleep'

export class SearchRepository extends Repository {
  private client = algolia(env.algolia.id, env.algolia.key)

  get workIndex() {
    return this.client.initIndex(`${env.algolia.indexprefix}works`)
  }

  setWorkSettings() {
    console.log(env.algolia.indexprefix)

    return this.workIndex.setSettings({
      searchableAttributes: ['title', 'titleEn', 'titleKana', 'seasonYear'],
    })
  }

  private convertToRecord(work: Work): Record<string, any> {
    return {
      objectID: work.id, // algolia上でのIDはobjectIDになる
      annictID: work.annictID,
      popularity: 0, // FIXME: ひとまず0を入れておく
      title: work.title,
      titleEn: work.titleEn,
      titleKana: work.titleKana,
      imageURL: work.imageURL,
      season: work.season,
      year: work.year,
      seasonYear: `${work.year}_${work.season}`,
      media: work.media,
    }
  }

  registerWorks(works: Work[]) {
    const batchSize = 100
    const needsSleep = works.length > batchSize
    return handleInBatch(works, batchSize, async workList => {
      await this.workIndex.saveObjects(workList.map(work => this.convertToRecord(work)))
      if (needsSleep) await sleep(2 * 1000)
    })
  }
}
