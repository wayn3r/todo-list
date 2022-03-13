import { Sqlite3Database } from '../../../shared/infrastructure/Sqlite3Database';
import { TaskDescription } from '../../../task/domain/TaskDescription';
import { TaskPriority } from '../../../task/domain/TaskPriority';
import { TaskStatus } from '../../../task/domain/TaskStatus';
import { TaskTitle } from '../../../task/domain/TaskTitle';
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
      ({ title, status, description, priority, id }) =>
        new Task(
          new TaskTitle(title),
          new TaskStatus(status),
          new TaskDescription(description),
          new TaskPriority(priority),
          id,
        ),
    );
  }
}
