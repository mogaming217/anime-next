export const OriginalType = {
  comic: 'comic',
  lightNovel: 'lightNovel',
  novel: 'novel',
} as const

export type OriginalType = typeof OriginalType[keyof typeof OriginalType]

export function originalTypeLabel(type: OriginalType) {
  switch (type) {
    case 'comic':
      return 'コミック'
    case 'lightNovel':
      return 'ライトノベル'
    case 'novel':
      return '小説'
  }
}

export class OriginalLink {
  constructor(readonly amazon: string | undefined) {}
}

export class Original {
  constructor(
    readonly id: string,
    readonly originalType: OriginalType,
    readonly animeEpisodeNo: string | undefined,
    readonly originalNo: string | undefined,
    readonly link: OriginalLink | undefined,
    readonly title: string | null,
    readonly imageURL: string | null
  ) {}
}
