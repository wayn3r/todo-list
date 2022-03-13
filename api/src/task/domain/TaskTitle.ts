import { StringValueObject } from 'src/shared/domain/StringValueObject';

export class TaskTitle extends StringValueObject {
  public constructor(readonly value: string) {
    super(value);
    this.validate();
  }
  public validate() {
    if (!this.value) {
      throw new Error('Task title is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('Task title must be text');
    }
  }
}
