import { Injectable } from '@nestjs/common';
import { Sqlite3Database } from 'src/shared/Sqlite3Database';
import { CreateTaskRepository } from '../../domain/CreateTaskRepository';
import { Task } from '../../domain/Task';

@Injectable()
export class Sqlite3CreateTaskRepository
  extends Sqlite3Database
  implements CreateTaskRepository
{
  public save(task: Task): void {
    this.query(
      'INSERT INTO tasks(title, description, priority, status) VALUES(?, ?, ?, ?)',
      [task.title, task.description, task.priority, task.status],
    );
    return;
  }
}
