import { GraphQLQuery } from "./query"

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
