import axios from 'axios'
import { env } from '../env'
import fetchWorksQuery from '../query/fetchWorks'

export class AnnictRepository {
  get endpoint(): string {
    return 'https://api.annict.com/graphql'
  }

  // get headers
  get headers(): { [key: string]: string } {
    return {
      Authorization: `bearer ${env.annict.token}`
    }
  }

  private async query(queryData: string, variables?: object) {
    const response = await axios.post(this.endpoint, {
      query: queryData, variables
    }, {
      headers: this.headers
    })
    return response.data
  }

  async fetchWorks() {
    const data = await this.query(fetchWorksQuery, {
      seasons: ['2019-winter'],
      first: 10
    })
    return data
  }
}
