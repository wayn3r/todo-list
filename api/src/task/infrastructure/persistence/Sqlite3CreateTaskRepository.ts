import { Injectable } from '@nestjs/common';
import { Sqlite3Database } from '../../../shared/infrastructure/Sqlite3Database';
import { CreateTaskRepository } from '../../domain/CreateTaskRepository';
import { Task } from '../../domain/Task';

@Injectable()
export class Sqlite3CreateTaskRepository
  extends Sqlite3Database
  implements CreateTaskRepository
{
  public async save(task: Task): Promise<Task> {
    const result = await this.query(
      'INSERT INTO tasks(title, description, priority, status) VALUES(?, ?, ?, ?)',
      [
        task.title.value,
        task.description.value,
        task.priority.value,
        task.status.value,
      ],
    );
    return new Task(
      task.title,
      task.status,
      task.description,
      task.priority,
      result.lastId,
    );
  }
}
