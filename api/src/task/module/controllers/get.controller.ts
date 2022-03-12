import { Controller, Get, Query } from '@nestjs/common';
import { Task } from '../../domain/Task';
import { QueryTaskDto } from '../dtos/QueryTaskDto';
import { ListTasksService } from '../services/ListTasksService';

@Controller('task')
export class TaskGetController {
  public constructor(private service: ListTasksService) {}
  @Get()
  public async listTasks(@Query() query: QueryTaskDto): Promise<Task[]> {
    const { q, sortBy } = query;
    const tasks = await this.service.handle({ q, sortBy });
    return tasks;
  }
}
