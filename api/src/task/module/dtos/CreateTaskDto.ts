export class CreateTaskDto {
  readonly title: string;
  readonly status: string;
  readonly description?: string;
  readonly priority?: string;
}
