export const OriginalType = {
  comic: 'comic',
  lightNovel: 'lightNovel',
  novel: 'novel',
} as const

export type OriginalType = typeof OriginalType[keyof typeof OriginalType]

export class OriginalLink {
  constructor(
    readonly amazon: string | undefined
  ){}
}

export class Original {
  constructor(
    readonly id: string,
    readonly workID: string,
    readonly originalType: OriginalType,
    readonly animeEpisodeNo: string | null,
    readonly originalNo: string | null,
    readonly link: OriginalLink | null,
    readonly title: string | null,
    readonly imageURL: string | null,
  ){}
}
