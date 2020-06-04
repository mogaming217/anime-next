import axios from 'axios'
import { env } from '../env'

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

  private async post(url: string, data?: any) {
    const response = await axios.post(url, data, {
      headers: this.headers
    })
    return response.data
  }

  async fetchWorks() {
    const data = await this.post(this.endpoint)
    return data
  }
}
