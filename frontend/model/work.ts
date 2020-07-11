export class Work {
  readonly id: string
  constructor(
    readonly annictID: string,
    readonly title: string,
    readonly imageURL: string | null,
  ) {
    this.id = annictID
  }
}
