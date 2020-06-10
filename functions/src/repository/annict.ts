import axios from 'axios'
import { env } from '../env'
import { FetchWorksQuery, convertNode } from '../query/fetchWorks'
import { GraphQLQuery, GraphQLResponse } from '../query/query'
import { Result, Failure, Success } from '../common/result'
import { Work } from '../model'
import { compactMap } from '../util/array'

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

  private async query<T>(query: GraphQLQuery<T>): Promise<Result<T, QueryError>> {
    const body = {
      query: query.body,
      variables: query.variables || null
    }

    try {
      const postResult = await axios.post(this.endpoint, body, {
        headers: this.headers
      })
      const response: GraphQLResponse<T> = postResult.data

      // これを完全にエラーにすべきかは場合によるが、今回はすべて必須のフィールドのためエラーとする
      if (response.errors && response.errors.length > 0) {
        return new Failure({ code: 'has_error_field', payload: response.errors })
      }

      const data = query.parse(response.data)
      if (!data) return new Failure({ code: 'parse_failed', payload: response.data })

      return new Success(data)
    } catch (error) {
      return new Failure({ code: 'unexpected', payload: error })
    }
  }

  // TODO: specify type
  async fetchWorks(): Promise<Result<Work[], QueryError>> {
    const fetchWorksQuery = new FetchWorksQuery({
      seasons: ['2019-winter'],
      first: 10
    })
    const result = await this.query(fetchWorksQuery)

    if (result.isFailure) {
      // TODO: error handling
      return new Failure(result.error)
    }

    const works = compactMap(result.value.searchWorks.nodes, node => convertNode(node))
    return new Success(works)
  }
}