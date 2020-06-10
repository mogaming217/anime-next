import { GraphQLQuery } from "./query"
import { Work as WorkModel } from "../model"
import { Season } from "../enum/season"

export interface FetchWorksData {
  searchWorks: {
    nodes: Work[]
  }
}

interface Work {
  annictId: number
  title: string
  titleEn: string | null
  titleKana: string | null
}

// FIXME: 命名イマイチ
export const convertNode = (node: Work): WorkModel | null => {
  return new WorkModel(
    node.annictId.toString(),
    node.title,
    node.titleEn,
    node.titleKana
  )
}

type Variables = {
  seasons: string[],
  first: number,
  after?: string
}

export class FetchWorksQuery implements GraphQLQuery<FetchWorksData> {
  readonly variables: Variables
  constructor(
    variables: {
      first: number,
      quotas: { year: number, season: Season }[],
      after?: string
    }
  ) {
    this.variables = {
      seasons: variables.quotas.map(q => `${q.year}-${q.season}`),
      first: variables.first,
      after: variables.after
    }
  }

  readonly body: string = `
  query fetchWorks($seasons: [String!], $first: Int!, $after: String) {
    searchWorks(
      seasons: $seasons,
      first: $first,
      after: $after
    ) {
      nodes {
        annictId
        title
        titleEn
        titleKana
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  `

  parse(data: any): FetchWorksData | null {
    if (!data.searchWorks) return null
    return data
  }
}
