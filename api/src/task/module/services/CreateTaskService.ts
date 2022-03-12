import { Injectable } from '@nestjs/common';
import { TaskCreator } from 'src/task/application/TaskCreator';
import { Task } from 'src/task/domain/Task';
import { Sqlite3CreateTaskRepository } from 'src/task/infrastructure/persistence/Sqlite3CreateTaskRepository';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

@Injectable()
export class CreateTaskService {
  public handle({ title, status, priority, description }: CreateTaskDto): Task {
    const respository = new Sqlite3CreateTaskRepository();
    const creator = new TaskCreator(respository);
    const task = creator.create({
      title,
      status,
      description,
      priority,
    });
    return task;
  }
}
