import axios from 'axios'
import { env } from '../env'
import fetchWorksQuery from '../query/fetchWorks'
import { Result, Failure, Success } from '../common/result'

interface GraphQLResponse<T> {
  data: T,
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
}

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

  private async query<T>(queryData: string, variables?: object): Promise<Result<T, GraphQLError[]>> {
    const data = {
      query: queryData,
      variables
    }

    const response: GraphQLResponse<T> = await axios.post(this.endpoint, data, {
      headers: this.headers
    })

    if (response.errors && response.errors.length > 0) {
      return new Failure(response.errors)
    }

    return new Success(response.data)
  }

  async fetchWorks() {
    const data = await this.query(fetchWorksQuery, {
      seasons: ['2019-winter'],
      first: 10
    })
    return data
  }
}
