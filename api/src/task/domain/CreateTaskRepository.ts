import { Task } from './Task';
export interface CreateTaskRepository {
  save(task: Task): void;
}
