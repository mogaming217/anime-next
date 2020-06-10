export class Work {
  readonly annictID: string

  constructor(
    annictId: string,
    readonly title: string,
    readonly titleEn: string | null,
    readonly titleKana: string | null
  ) {
    this.annictID = annictId
  }
}
