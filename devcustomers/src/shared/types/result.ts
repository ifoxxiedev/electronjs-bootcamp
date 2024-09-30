export class Result<T> {
  constructor(
    public data: T,
    public error?: unknown
  ) {}

  static of<T>(data: T) {
    return new Result(data)
  }

  static ofError(error: unknown) {
    return new Result(undefined, error)
  }
}
