import { Injectable } from '@nestjs/common';
import { TaskCreator } from '../../application/TaskCreator';
import { Task } from '../../domain/Task';
import { Sqlite3CreateTaskRepository } from '../../infrastructure/persistence/Sqlite3CreateTaskRepository';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

@Injectable()
export class CreateTaskService {
  public async handle({
    title,
    status,
    priority,
    description,
  }: CreateTaskDto): Promise<Task> {
    const respository = new Sqlite3CreateTaskRepository();
    const creator = new TaskCreator(respository);
    const task = await creator.create({
      title,
      status,
      description,
      priority,
    });
    return task;
  }
}
