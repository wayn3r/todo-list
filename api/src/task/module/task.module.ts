import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TaskGetController } from './controllers/get.controller';
import { TaskPostController } from './controllers/post.controller';
import { TaskPostMiddleware } from './middlewares/post.middleware';
import { CreateTaskService } from './services/CreateTaskService';
import { ListTasksService } from './services/ListTasksService';

@Module({
  imports: [],
  controllers: [TaskPostController, TaskGetController],
  providers: [CreateTaskService, ListTasksService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TaskPostMiddleware).forRoutes({
      path: 'task',
      method: RequestMethod.POST,
    });
  }
}
