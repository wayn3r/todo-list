import { FindTaskRepository } from '../domain/FindTaskRepository';
import { Task } from '../domain/Task';

export class TaskFinder {
  public constructor(private repository: FindTaskRepository) {}

  public async run(search: string): Promise<Task[]> {
    const tasks = await this.repository.find(search);
    return tasks;
  }
}
