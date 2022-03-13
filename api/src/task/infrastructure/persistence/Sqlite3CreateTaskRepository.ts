import { Injectable } from '@nestjs/common';
import { TaskId } from 'src/task/domain/TaskId';
import { Sqlite3Database } from '../../../shared/infrastructure/Sqlite3Database';
import { CreateTaskRepository } from '../../domain/CreateTaskRepository';
import { Task } from '../../domain/Task';

@Injectable()
export class Sqlite3CreateTaskRepository
  extends Sqlite3Database
  implements CreateTaskRepository
{
  public async save(task: Task): Promise<TaskId> {
    const result = await this.query(
      'INSERT INTO tasks(title, description, priority, status) VALUES(?, ?, ?, ?)',
      [
        task.title.value,
        task.description.value,
        task.priority.value,
        task.status.value,
      ],
    );
    return new TaskId(result.lastId);
  }
}
