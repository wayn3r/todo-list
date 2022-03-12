import { Module } from '@nestjs/common';
import { TaskGetController } from './controllers/get.controller';
import { TaskPostController } from './controllers/post.controller';
import { CreateTaskService } from './services/CreateTaskService';

@Module({
  imports: [],
  controllers: [TaskPostController, TaskGetController],
  providers: [CreateTaskService],
})
export class TaskModule {}
