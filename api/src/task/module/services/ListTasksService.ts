import { Injectable } from '@nestjs/common';
import { TaskFinder } from '../../application/TaskFinder';
import { Task } from '../../domain/Task';
import { Sqlite3FindTaskRepository } from '../../infrastructure/persistence/Sqlite3FindTaskRepository';
import { QueryTaskDto } from '../dtos/QueryTaskDto';

@Injectable()
export class ListTasksService {
  public async handle({ q, sortBy }: QueryTaskDto): Promise<Task[]> {
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
