import { Task } from './Task';

export interface FindTaskRepository {
  find(searchTerm?: string): Promise<Task[]>;
}
