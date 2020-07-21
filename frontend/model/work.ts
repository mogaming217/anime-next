import { Season } from "enum/season"

export class Work {
  readonly id: string
  constructor(
    readonly annictID: string,
    readonly title: string,
    readonly imageURL: string | null,
    readonly season: Season,
    readonly year: number,
  ) {
    this.id = annictID
  }
}
