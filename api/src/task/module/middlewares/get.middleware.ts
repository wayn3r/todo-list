import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class TaskGetMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { q, sortBy } = request.query as Record<string, string>;
    let errors = [this.validateQuery(q), this.validateSortBy(sortBy)];
    errors = errors.filter(Boolean);
    if (errors.length !== 0) {
      return response.status(422).json(errors);
    }
    next();
  }

  private validateQuery(query?: string): any | void {
    if (query && typeof query !== 'string') {
      return {
        name: 'q',
        message: 'Search must be text',
      };
    }
  }
  private validateSortBy(sortBy?: string): any | void {
    const validSortByProperties = [
      'id',
      'title',
      'status',
      'priority',
      'description',
    ];
    if (sortBy && !validSortByProperties.includes(sortBy)) {
      return {
        name: 'sortBy',
        message:
          'Invalid sortBy. Acepted sortBy values are ' + validSortByProperties,
      };
    }
  }
}
