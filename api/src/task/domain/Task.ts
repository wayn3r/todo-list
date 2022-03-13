import { TaskDescription } from './TaskDescription';
import { TaskId } from './TaskId';
import { TaskPriority } from './TaskPriority';
import { TaskStatus } from './TaskStatus';
import { TaskTitle } from './TaskTitle';

export class Task {
  public constructor(
    readonly id: TaskId,
    readonly title: TaskTitle,
    readonly description: TaskDescription,
    readonly priority: TaskPriority,
    readonly status: TaskStatus,
  ) {}
}
