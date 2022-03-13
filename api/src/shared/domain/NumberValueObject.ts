export class NumberValueObject {
  public constructor(readonly value: number) {}
  public toJSON(): number {
    return this.value;
  }
}
