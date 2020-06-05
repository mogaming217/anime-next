export class Success<T> {
  readonly isFailure = false
  constructor(readonly value: T) {}
}

export class Failure<E> {
  readonly isFailure = true
  constructor(readonly error: E) {}
}

export type Result<T, E> = Success<T> | Failure<E>
