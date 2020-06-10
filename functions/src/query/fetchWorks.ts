import { GraphQLQuery } from "./query"
import { Work as WorkModel } from "../model"

export interface FetchWorksData {
  searchWorks: {
    nodes: Work[]
  }
}

interface Work {
  annictId: string
  title: string
  titleEn: string | null
  titleKana: string | null
}

// FIXME: 命名イマイチ
export const convertNode = (node: Work): WorkModel | null => {
  return new WorkModel(
    node.annictId,
    node.title,
    node.titleEn,
    node.titleKana
  )
}

export class FetchWorksQuery implements GraphQLQuery<FetchWorksData> {
  readonly variables: object
  constructor(
    variables: {
      seasons: string[],
      first: number
    }
  ) {
    this.variables = variables
  }

  readonly body: string = `
  query fetchWorks($seasons: [String!], $first: Int!) {
    searchWorks(
      seasons: $seasons,
      first: $first
    ) {
      nodes {
        annictId
        title
        titleEn
        titleKana
      }
    }
  }
  `

  parse(data: any): FetchWorksData | null {
    if (!data.searchWorks) return null
    return data
  }
}
