const Amazon = require('paapi5-nodejs-sdk')
import { env } from '../env'

export class AmazonRepository {
  private api: any

  constructor() {
    const client = Amazon.ApiClient.instance
    client.accessKey = env.amazon.access
    client.secretKey = env.amazon.secret
    client.host = 'webservices.amazon.co.jp'
    client.region = 'us-west-2'
    this.api = new Amazon.DefaultApi()
  }

  private get resoucesForSearchBooks(): string[] {
    return [
      'Images.Primary.Large',
      'ItemInfo.Title',
    ]
  }

  // SearchIndex: https://webservices.amazon.com/paapi5/documentation/locale-reference/japan.html
  private constructRequest(searchIndex: string, keyword: string) {
    const request = new Amazon.SearchItemsRequest()
    request['PartnerTag'] = 'seiyaorz-22'
    request['PartnerType'] = 'Associates'
    request['SearchIndex'] = searchIndex
    request['Keywords'] = keyword
    request['ItemCount'] = 1
    request['Resources'] = this.resoucesForSearchBooks
    return request
  }

  fetchImageURL(keyword: string): Promise<string | null> {
    const request = this.constructRequest('AmazonVideo', keyword)
    return new Promise<string | null>((resolve, reject) => {
      this.api.searchItems(request, async (error: any, data: any, r: any) => {
        if (error) {
          reject(error)
          return
        }

        const res = Amazon.SearchItemsResponse.constructFromObject(data)
        const imageURL = res.SearchResult?.Items?.[0]?.Images?.Primary?.Large?.URL || null
        resolve(imageURL)
      })
    })
  }
}
