import { User } from '.'

export class Me extends User {
  constructor(readonly id: string, readonly isAdmin: boolean) {
    super(id, true)
  }
}
