import { expect, test } from "bun:test";
import { splitCharm } from "../arrays";
import { charm } from "../charm";

test("splitCharm", () => {
  const arrayCharm = charm([10, 11, 12, 13, 14]);
  const splitArrayCharm = splitCharm(arrayCharm);

  expect(splitArrayCharm.get().length).toBe(5);

});
