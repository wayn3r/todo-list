import { Controller, Get, Query } from '@nestjs/common';
import { TaskFinder } from '../../application/TaskFinder';
import { Task } from '../../domain/Task';
import { QueryTaskDto } from '../dtos/QueryTaskDto';
import { Sqlite3FindTaskRepository } from '../../infrastructure/persistence/Sqlite3FindTaskRepository';

@Controller('task')
export class TaskGetController {
  @Get()
  public async listTasks(@Query() query: QueryTaskDto): Promise<Task[]> {
    const { q, sortBy } = query;
    const respository = new Sqlite3FindTaskRepository();
    const finder = new TaskFinder(respository);
    const tasks = await finder.run(q);
    if (sortBy) {
      return tasks.sort((taskA: Task, taskB: Task) =>
        taskA[sortBy] < taskB[sortBy] ? -1 : 1,
      );
    }
    return tasks;
  }
}
