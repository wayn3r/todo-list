import { Task } from './Task';
import { TaskId } from './TaskId';
export interface CreateTaskRepository {
  save(task: Task): Promise<TaskId>;
}
