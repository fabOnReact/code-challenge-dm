import { mergeList, getMessage } from "index";

describe("merges a list", () => {
  test("with negative numbers", () => {
    const list = [
      [-50, 2],
      [2, 4],
      [5, 8],
    ];
    const result = [
      [-50, 4],
      [5, 8],
    ];
    expect(mergeList(list)).toEqual(result);
  });

  test("that is an empty array", () => {
    expect(mergeList([])).toEqual([]);
  });

  test("with duplicates", () => {
    const list = [
      [2, 4],
      [2, 4],
    ];
    expect(mergeList(list)).toEqual([[2, 4]]);
  });

  test("multiple negative intervals", () => {
    const list = [
      [-50, 2],
      [-2, 40],
      [-60, 8],
      [100, 200],
      [300, 400],
    ];
    const result = [
      [-60, 40],
      [100, 200],
      [300, 400],
    ];
    expect(mergeList(list)).toEqual(result);
  });

  test("multiple intervals", () => {
    const list = [
      [0, 2],
      [4, 8],
      [10, 12],
      [12, 12],
      [11, 12],
    ];
    const result = [
      [0, 2],
      [4, 8],
      [10, 12],
    ];
    expect(mergeList(list)).toEqual(result);
  });

  test("no overlaps", () => {
    const list = [
      [10, 12],
      [14, 18],
      [110, 112],
    ];
    const result = [
      [10, 12],
      [14, 18],
      [110, 112],
    ];
    expect(mergeList(list)).toEqual(result);
  });

  test("intervals are not sorted", () => {
    const list = [
      [2, 6],
      [1, 2],
    ];
    const result = [[1, 6]];
    expect(mergeList(list)).toEqual(result);
  });
});

describe("throws an error when", () => {
  test("there is only one invalid interval", () => {
    expect(() => mergeList([[undefined]])).toThrow(
      getMessage("WRONG_LIST_VALUE", [undefined])
    );
  });

  test("the first interval value is invalid", () => {
    expect(() =>
      mergeList([
        [undefined, 1],
        [1, 2],
      ])
    ).toThrow(getMessage("WRONG_LIST_VALUE", [undefined, 1]));
  });

  test("the second interval value is invalid", () => {
    expect(() =>
      mergeList([
        [1, 1],
        [2, null],
      ])
    ).toThrow(getMessage("WRONG_LIST_VALUE", [2, null]));
  });

  test("the interval start minute is after the end minute", () => {
    expect(() =>
      mergeList([
        [1, 1],
        [2, 1],
      ])
    ).toThrow(getMessage("WRONG_INTERVAL_START", [2, 1]));
  });

  test("the list is undefined", () => {
    expect(() => mergeList(undefined)).toThrow(
      getMessage("WRONG_LIST_VALUE", undefined)
    );
  });

  test("the list is not an Array", () => {
    expect(() => mergeList("word")).toThrow(
      getMessage("WRONG_LIST_TYPE", "word")
    );
  });
});
