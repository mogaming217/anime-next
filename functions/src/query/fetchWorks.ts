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
  titleEn: string
  titleKana: string
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

export const fetchWorksQuery: GraphQLQuery<FetchWorksData> = {
  body: `
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
  `,
  parse (data: any) {
    if (!data.searchWorks) return null
    return data
  }
}
