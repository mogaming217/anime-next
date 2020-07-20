import { Model } from './model'
import { Season } from '../enum/season'

export class Work implements Model {
  readonly annictID: string

  constructor(
    annictId: string,
    readonly title: string,
    readonly titleEn: string | null,
    readonly titleKana: string | null,
    public imageURL: string | null = null,
    readonly season: Season,
    readonly year: number,
  ) {
    this.annictID = annictId
  }

  get id() {
    return this.annictID
  }
}
