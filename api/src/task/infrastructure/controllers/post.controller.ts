import { Body, Controller, Post } from '@nestjs/common';
import { TaskCreator } from '../../application/TaskCreator';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { Sqlite3CreateTaskRepository } from '../persistence/Sqlite3CreateTaskRepository';

@Controller('task')
export class TaskPostController {
  @Post()
  public createTask(@Body() body: CreateTaskDto) {
    const { title, status, priority, description } = body;

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
