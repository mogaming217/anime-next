import { User } from '.'

export class Others extends User {
  constructor(readonly id: string) {
    super(id, false)
  }
}
