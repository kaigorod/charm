import { expect, mock, test } from "bun:test";
import { arrayEltCharm } from "../src/arrays";
import { charm } from "../src/charm";

test("arrayEltCharm", () => {
  const arrayCharm = charm([1, 2]);
  const elt0 = arrayEltCharm(arrayCharm, 0);
  const elt1 = arrayEltCharm(arrayCharm, 1);

  expect(elt0.get()).toBe(1);

  const fn0 = (_nextValue: number, _prevValue: number) => { };
  const fn1 = (_nextValue: number, _prevValue: number) => {
    throw new Error();
  };
  const mockFn0 = mock(fn0);
  const mockFn1 = mock(fn1);
  elt0.sub(mockFn0);
  elt1.sub(mockFn1);

  arrayCharm.update((prev) => {
    const next = [...prev];
    next[0] = 3;
    return next;
  });
  expect(elt0.get()).toBe(3);
  expect(elt1.get()).toBe(2);

  expect(mockFn0).toHaveBeenCalledTimes(1);
  expect(mockFn0.mock.calls[0]).toEqual([3, 1]);

  //
  expect(mockFn1).toHaveBeenCalledTimes(0);
});
