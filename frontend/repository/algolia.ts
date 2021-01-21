import algolia from 'algoliasearch/lite'
import { publicEnv } from 'env'

export class AlgoliaRepository {
  private client = algolia(publicEnv.algolia.appID, publicEnv.algolia.searchKey)

  get workIndex() {
    return this.client.initIndex(`${publicEnv.algolia.indexPrefix}works`)
  }
}
