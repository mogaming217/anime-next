export class Work {
  readonly annictID: string

  constructor(
    annictId: string,
    readonly title: string,
    readonly titleEn: string,
    readonly titleKana: string
  ) {
    this.annictID = annictId
  }
}
