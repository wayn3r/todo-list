import { TaskCreator } from './TaskCreator';
import { CreateTaskRepository } from '../domain/CreateTaskRepository';
import { Task } from '../domain/Task';
import { TaskTitle } from '../domain/TaskTitle';
import { TaskStatus } from '../domain/TaskStatus';
import { TaskDescription } from '../domain/TaskDescription';
import { TaskPriority } from '../domain/TaskPriority';
import { TaskId } from '../domain/TaskId';

describe('TaskCreator tests', () => {
  const repository: CreateTaskRepository = {
    save: jest.fn(async () => new TaskId(1)),
  };
  const creator: TaskCreator = new TaskCreator(repository);

  it('should call repository save method', async () => {
    const taskToSave = { title: 'test', status: 'open' };
    const savedTask = await creator.create(taskToSave);
    expect(repository.save).toHaveBeenCalledWith(
      new Task(
        new TaskId(),
        new TaskTitle(taskToSave.title),
        new TaskDescription(),
        new TaskPriority(),
        new TaskStatus(taskToSave.status),
      ),
    );
    expect(savedTask).toEqual(
      new Task(
        new TaskId(1),
        new TaskTitle(taskToSave.title),
        new TaskDescription(),
        new TaskPriority(),
        new TaskStatus(taskToSave.status),
      ),
    );
  });
});
