import { StringValueObject } from '../../shared/domain/StringValueObject';

export class TaskDescription extends StringValueObject {
  public constructor(readonly value: string = null) {
    super(value);
    this.validate();
  }
  public validate() {
    if (this.value && typeof this.value !== 'string') {
      throw new Error('Task description must be text');
    }
  }
}
