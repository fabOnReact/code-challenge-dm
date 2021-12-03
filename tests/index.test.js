import { merge, getMessage } from "index";

describe("merges a list", () => {
  test("with unsorted elements", () => {
    const list = [
      [25, 30],
      [2, 19],
      [14, 23],
      [4, 8],
    ];
    const result = [
      [2, 23],
      [25, 30],
    ];
    expect(merge(list)).toEqual(result);
  });

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
    expect(merge(list)).toEqual(result);
  });

  test("that is an empty array", () => {
    expect(merge([])).toEqual([]);
  });

  test("with duplicates", () => {
    const list = [
      [2, 4],
      [2, 4],
    ];
    expect(merge(list)).toEqual([[2, 4]]);
  });

  test("with multiple negative intervals", () => {
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
    expect(merge(list)).toEqual(result);
  });

  test("with multiple intervals", () => {
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
    expect(merge(list)).toEqual(result);
  });

  test("with no overlap", () => {
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
    expect(merge(list)).toEqual(result);
  });

  test("with non sorted intervals", () => {
    const list = [
      [8, 10],
      [2, 6],
      [1, 2],
    ];
    const result = [
      [1, 6],
      [8, 10],
    ];
    expect(merge(list)).toEqual(result);
  });
});

describe("throws an error when", () => {
  test("there is only one invalid interval", () => {
    expect(() => merge([[undefined]])).toThrow(
      getMessage("WRONG_LIST_VALUE", [undefined])
    );
  });

  test("the first interval value is invalid", () => {
    expect(() =>
      merge([
        [undefined, 1],
        [1, 2],
      ])
    ).toThrow(getMessage("WRONG_LIST_VALUE", [undefined, 1]));
  });

  test("the second interval value is invalid", () => {
    expect(() =>
      merge([
        [1, 1],
        [2, null],
      ])
    ).toThrow(getMessage("WRONG_LIST_VALUE", [2, null]));
  });

  test("the interval start minute is after the end minute", () => {
    expect(() =>
      merge([
        [1, 1],
        [2, 1],
      ])
    ).toThrow(getMessage("WRONG_INTERVAL_START", [2, 1]));
  });

  test("the list is undefined", () => {
    expect(() => merge(undefined)).toThrow(
      getMessage("WRONG_LIST_VALUE", undefined)
    );
  });

  test("the list is not an Array", () => {
    expect(() => merge("word")).toThrow(getMessage("WRONG_LIST_TYPE", "word"));
  });
});
