import { sleep } from ".";
import { expect, test } from "vitest";

test("Test sleep", async () => {
  await sleep(1000);
  expect("Hi!").is.a("string");
});
