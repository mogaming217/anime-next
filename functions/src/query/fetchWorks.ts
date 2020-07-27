import { GraphQLQuery } from "./query"
import { Work as WorkModel } from "../model"
import { Season } from "../enum/season"
import { WorkMedia } from "../enum/workMedia"

export interface FetchWorksData {
  searchWorks: {
    nodes: Work[]
  }
}

// FIXME: 命名イマイチ
export const convertNode = (node: Work): WorkModel | null => {
  let imageURL = node.image?.recommendedImageUrl
  if (imageURL && imageURL.length === 0) {
    imageURL = null
  }
  if (!(node.seasonName && node.seasonYear)) return null
  const season = node.seasonName.toLowerCase() as Season

  return new WorkModel(
    node.annictId.toString(),
    node.title,
    node.titleEn,
    node.titleKana,
    imageURL,
    season,
    node.seasonYear,
    node.media,
  )
}

interface Work {
  annictId: number
  title: string
  titleEn: string | null
  titleKana: string | null
  image: {
    recommendedImageUrl: string | null
  } | null,
  seasonName: string | null
  seasonYear: number | null
  media: WorkMedia,
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
        image {
          recommendedImageUrl
        }
        seasonName
        seasonYear
        media
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
