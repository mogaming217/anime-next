import algolia from 'algoliasearch/lite'
import { clientEnv } from "env"

export class AlgoliaRepository {
  private client = algolia(clientEnv.algolia.appID, clientEnv.algolia.searchKey)

  get workIndex() {
    return this.client.initIndex(`${clientEnv.algolia.indexPrefix}works`)
  }
}
