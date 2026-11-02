export function itemAt<T>(list: ArrayLike<T>, index: number): T {
  const item = list[index];
  if (item === undefined) {
    throw new RangeError(`No item at index ${String(index)}`);
  }
  return item;
}
