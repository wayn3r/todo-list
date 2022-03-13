import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskPriority } from '../../domain/TaskPriority';
import { TaskStatus } from '../../domain/TaskStatus';
import { TaskTitle } from '../../domain/TaskTitle';

@Injectable()
export class TaskPostMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { title, status, priority, description } = request.body;
    const errors = [
      this.validateTitle(title),
      this.validateStatus(status),
      this.validatePriority(priority),
      this.validateDescription(description),
    ].filter(Boolean);
    if (errors.length !== 0) {
      return response.status(422).json(errors);
    }
    next();
  }

  private validateDescription(description?: string): any | void {
    try {
      new TaskDescription(description);
    } catch (e) {
      return {
        name: 'description',
        message: e.message,
      };
    }
  }
  private validatePriority(priority?: string): any | void {
    try {
      new TaskPriority(priority);
    } catch (e) {
      return {
        name: 'priority',
        message: e.message,
      };
    }
  }
  private validateTitle(title: string): any | void {
    try {
      new TaskTitle(title);
    } catch (e) {
      return {
        name: 'title',
        message: e.message,
      };
    }
  }
  private validateStatus(status: string): any | void {
    try {
      new TaskStatus(status);
    } catch (e) {
      return {
        name: 'status',
        message: e.message,
      };
    }
  }
}
