import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { CreateTaskService } from '../services/CreateTaskService';

@Controller('task')
export class TaskPostController {
  public constructor(private service: CreateTaskService) {}
  @Post()
  public createTask(@Body() body: CreateTaskDto) {
    const { title, status, priority, description } = body;
    const task = this.service.handle({ title, status, priority, description });
    return task;
  }
}
