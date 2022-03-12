import { Module } from '@nestjs/common';
import { TaskGetController } from './task/infrastructure/controllers/get.controller';
import { TaskPostController } from './task/infrastructure/controllers/post.controller';

@Module({
  imports: [],
  controllers: [TaskPostController, TaskGetController],
  providers: [],
})
export class AppModule {}
