import { NumberValueObject } from '../../shared/domain/NumberValueObject';

export class TaskId extends NumberValueObject {
  public constructor(readonly value: number = undefined) {
    super(value);
  }
}
