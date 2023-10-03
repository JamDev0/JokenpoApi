export class Entity extends Array {
  private onPush;

  constructor(
    onPush?: (pushedItems: any[], previewsArrayState: any[]) => void,
  ) {
    super();
    this.onPush = onPush;
  }

  push(...args) {
    this.onPush(args, this);
    return super.push(...args);
  }
}
