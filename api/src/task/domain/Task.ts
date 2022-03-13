import { TaskDescription } from './TaskDescription';
import { TaskPriority } from './TaskPriority';
import { TaskStatus } from './TaskStatus';
import { TaskTitle } from './TaskTitle';

export class Task {
  public constructor(
    readonly title: TaskTitle,
    readonly status: TaskStatus,
    readonly description: TaskDescription,
    readonly priority: TaskPriority,
    readonly id?: number,
  ) {}
}
