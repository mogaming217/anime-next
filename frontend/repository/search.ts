import algolia from 'algoliasearch/lite'
import { clientEnv } from "env";
import { Work } from "model/work";
import { compactMap } from "helper/array";

export class SearchRepository {
  private client = algolia(clientEnv.algolia.appID, clientEnv.algolia.searchKey)

  get workIndex() {
    return this.client.initIndex(`${clientEnv.algolia.indexPrefix}works`)
  }

  decode(hit: any): Work | undefined {
    return new Work(hit.annictID, hit.title, hit.imageURL)
  }

  async searchWorks(keyword: string): Promise<Work[]> {
    const result = await this.workIndex.search(keyword, { hitsPerPage: 30 })
    return compactMap(result.hits, hit => this.decode(hit))
  }
}
