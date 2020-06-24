export class Work {
  constructor(
    readonly annictID: string,
    readonly title: string,
    readonly imageURL: string | null,
  ) {}

  get id() {
    return this.annictID
  }
}
