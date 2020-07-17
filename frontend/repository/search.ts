import algolia from 'algoliasearch/lite'
import { Work } from "model/work"
import { compactMap } from "helper/array"
import { AlgoliaRepository } from './algolia'

export class SearchRepository extends AlgoliaRepository {
  decode(hit: any): Work | undefined {
    return new Work(hit.annictID, hit.title, hit.imageURL)
  }

  async searchWorks(keyword: string): Promise<Work[]> {
    const result = await this.workIndex.search(keyword, { hitsPerPage: 30 })
    return compactMap(result.hits, hit => this.decode(hit))
  }
}
