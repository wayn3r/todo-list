import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

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
    if (description && typeof description !== 'string') {
      return {
        name: 'description',
        message: 'Description must be text',
      };
    }
  }
  private validatePriority(priority?: string): any | void {
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return {
        name: 'priority',
        message: 'Invalid priority. Acepted priorities are ' + validPriorities,
      };
    }
  }
  private validateTitle(title: string): any | void {
    if (!title || typeof title !== 'string') {
      return {
        name: 'title',
        message: 'Title is required',
      };
    }
  }
  private validateStatus(status: string): any | void {
    const validStatuses = ['open', 'in progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return {
        name: 'status',
        message: 'Invalid status. Acepted statuses are ' + validStatuses,
      };
    }
  }
}
