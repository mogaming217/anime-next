import { User } from '.'

export class Me extends User {
  constructor(readonly id: string) {
    super(id, true)
  }
}
