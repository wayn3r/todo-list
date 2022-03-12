import { Module } from '@nestjs/common';
import { TaskModule } from './task/module/task.module';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
