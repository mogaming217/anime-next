import { Model } from './model'
import { Season } from '../enum/season'
import { WorkMedia } from '../enum/workMedia'

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
    readonly media: WorkMedia,
  ) {
    this.annictID = annictId
  }

  get id() {
    return this.annictID
  }
}
