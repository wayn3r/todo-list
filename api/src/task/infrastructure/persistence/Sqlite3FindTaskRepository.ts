import { Sqlite3Database } from 'src/shared/Sqlite3Database';
import { FindTaskRepository } from '../../domain/FindTaskRepository';
import { Task } from '../../domain/Task';

export class Sqlite3FindTaskRepository
  extends Sqlite3Database
  implements FindTaskRepository
{
  public async find(searchTerm?: string): Promise<Task[]> {
    const tasks = await this.list('tasks', {
      $or: {
        title: searchTerm,
        description: searchTerm,
      },
    });
    if (tasks instanceof Error) {
      throw new Error('Error while getting the tasks');
    }
    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.status,
          task.description,
          task.priority,
          task.id,
        ),
    );
  }
}
