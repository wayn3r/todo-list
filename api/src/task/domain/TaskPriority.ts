import { StringValueObject } from '../../shared/domain/StringValueObject';

export class TaskPriority extends StringValueObject {
  public static readonly VALID_PRIORITIES = ['low', 'medium', 'high'];
  public constructor(readonly value: string = 'low') {
    super(value);
    this.validate();
  }
  public validate() {
    if (!this.value) {
      throw new Error('Task priority is required');
    }
    const validPriorities = TaskPriority.VALID_PRIORITIES;
    if (!validPriorities.includes(this.value)) {
      throw new Error(
        'Invalid priority. Acepted priorities are: ' +
          validPriorities.join(', '),
      );
    }
  }
}
