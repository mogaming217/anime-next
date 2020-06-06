import axios from 'axios'
import { env } from '../env'
import { fetchWorksQuery, FetchWorksData } from '../query/fetchWorks'
import { Result, Failure, Success } from '../common/result'
import { GraphQLQuery } from '../query/query'

interface GraphQLResponse<T> {
  data: T,
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
}

export type QueryErrorCode = 'has_error_field' | 'parse_failed' | 'unexpected'
export type QueryError = { code: QueryErrorCode, payload?: any }

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

  private async query<T>(query: GraphQLQuery<T>, variables?: object): Promise<Result<T, QueryError>> {
    const body = {
      query: query.body,
      variables
    }

    try {
      const response: GraphQLResponse<T> = await axios.post(this.endpoint, body, {
        headers: this.headers
      })

      // これを完全にエラーにすべきかは場合によるが、今回はすべて必須のフィールドのためエラーとする
      if (response.errors && response.errors.length > 0) {
        return new Failure({ code: 'has_error_field', payload: response.errors })
      }

      const data = query.parse(response.data)
      if (!data) return new Failure({ code: 'parse_failed', payload: response.data })

      return new Success(response.data)
    } catch (error) {
      return new Failure({ code: 'unexpected', payload: error })
    }
  }

  async fetchWorks() {
    const result = await this.query(fetchWorksQuery, {
      seasons: ['2019-winter'],
      first: 10
    })

    if (result.isFailure) {
      // TODO: error handling
      return
    }

    return result
  }
}
