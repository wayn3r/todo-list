import { CreateTaskRepository } from '../domain/CreateTaskRepository';
import { Task } from '../domain/Task';

interface TaskParams {
  title: string;
  status: string;
  description?: string;
  priority?: string;
}

export class TaskCreator {
  public constructor(private reporsitory: CreateTaskRepository) {}

  public create({ title, status, description, priority }: TaskParams): Task {
    const task = new Task(title, status, description, priority);
    this.reporsitory.save(task);
    return task;
  }
}
