export class Task {
  public constructor(
    readonly title: string,
    readonly status: string,
    readonly description?: string,
    readonly priority: string = 'low',
    readonly id?: number,
  ) {}
}
