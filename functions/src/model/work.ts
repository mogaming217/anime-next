import { Model } from './model'

export class Work implements Model {
  readonly annictID: string

  constructor(
    annictId: string,
    readonly title: string,
    readonly titleEn: string | null,
    readonly titleKana: string | null
  ) {
    this.annictID = annictId
  }

  get id() {
    return this.annictID
  }
}
