import { TaskPriority } from './../domain/TaskPriority';
import { TaskDescription } from './../domain/TaskDescription';
import { TaskStatus } from './../domain/TaskStatus';
import { TaskTitle } from './../domain/TaskTitle';
import { CreateTaskRepository } from '../domain/CreateTaskRepository';
import { Task } from '../domain/Task';
import { TaskId } from '../domain/TaskId';

interface TaskParams {
  title: string;
  status: string;
  description?: string;
  priority?: string;
}

export class TaskCreator {
  public constructor(private repository: CreateTaskRepository) {}

  public async create({
    title,
    status,
    description,
    priority,
  }: TaskParams): Promise<Task> {
    const task = new Task(
      new TaskId(),
      new TaskTitle(title),
      new TaskDescription(description),
      new TaskPriority(priority),
      new TaskStatus(status),
    );
    const id = await this.repository.save(task);
    return new Task(
      id,
      task.title,
      task.description,
      task.priority,
      task.status,
    );
  }
}
