import { StringValueObject } from '../../shared/domain/StringValueObject';

export class TaskStatus extends StringValueObject {
  public static readonly VALID_STATUSES = ['open', 'in progress', 'completed'];
  public constructor(readonly value: string) {
    super(value);
    this.validate();
  }
  public validate() {
    if (!this.value) {
      throw new Error('Task status is required');
    }
    const validStatuses = TaskStatus.VALID_STATUSES;
    if (!validStatuses.includes(this.value)) {
      throw new Error(
        'Invalid status. Acepted statuses are: ' + validStatuses.join(', '),
      );
    }
  }
}
