import { Module } from '@nestjs/common';
import { TaskGetController } from './controllers/get.controller';
import { TaskPostController } from './controllers/post.controller';
import { CreateTaskService } from './services/CreateTaskService';
import { ListTasksService } from './services/ListTasksService';

@Module({
  imports: [],
  controllers: [TaskPostController, TaskGetController],
  providers: [CreateTaskService, ListTasksService],
})
export class TaskModule {}
