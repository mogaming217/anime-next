const Amazon = require('paapi5-nodejs-sdk')
import { env } from '../env'
import { compactMap } from '../helper/array'

type ItemInfo = {
  title: string,
  link: string,
  imageURL: string | null,
}

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

  fetchItemInfo(keyword: string): Promise<ItemInfo[]> {
    const request = this.constructRequest('Books', keyword)
    return new Promise<ItemInfo[]>((resolve, reject) => {
      this.api.searchItems(request,  async (error: any, data: any, r: any) => {
        if (error) {
          reject(error)
          return
        }

        const res = Amazon.SearchItemsResponse.constructFromObject(data)
        const items: any[] = res.SearchResult?.Items || []
        const list = compactMap(items, item => {
          const title = item?.ItemInfo?.Title?.DisplayValue
          const link = item?.DetailPageURL

          if (!(item && title && link)) {
            return
          }

          const imageURL = item.Images?.Primary?.Large?.URL || null
          return {
            imageURL, title, link
          }
        })

        if (list.length === 0) {
          reject(new Error('not found'))
          return
        }

        resolve(list)
      })
    })
  }
}
