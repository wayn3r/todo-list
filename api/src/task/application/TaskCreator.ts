import { TaskPriority } from './../domain/TaskPriority';
import { TaskDescription } from './../domain/TaskDescription';
import { TaskStatus } from './../domain/TaskStatus';
import { TaskTitle } from './../domain/TaskTitle';
import { CreateTaskRepository } from '../domain/CreateTaskRepository';
import { Task } from '../domain/Task';

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
      new TaskTitle(title),
      new TaskStatus(status),
      new TaskDescription(description),
      new TaskPriority(priority),
    );
    const savedTask = await this.repository.save(task);
    return savedTask;
  }
}
