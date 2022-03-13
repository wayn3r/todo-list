import { Sqlite3Database } from 'src/shared/infrastructure/Sqlite3Database';
import { TaskDescription } from 'src/task/domain/TaskDescription';
import { TaskPriority } from 'src/task/domain/TaskPriority';
import { TaskStatus } from 'src/task/domain/TaskStatus';
import { TaskTitle } from 'src/task/domain/TaskTitle';
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
