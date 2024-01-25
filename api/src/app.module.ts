import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaskModule } from './task/module/task.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, process.env.STATIC_PATH || '../../app/dist/app'),
    }),
    TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
