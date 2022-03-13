export class StringValueObject {
  public constructor(readonly value: string) {}
  public toJSON(): string {
    return this.value;
  }
}
