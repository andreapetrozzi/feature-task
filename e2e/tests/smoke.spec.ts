import { test, expect } from "@playwright/test";
import { BASE_URL } from "../constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
});

test.describe("Basic tests", () => {
  test("Has proper title", async ({ page }) => {
    await expect(page).toHaveTitle(/Workbench/);
  });

  test("Check counter", async ({ page }) => {
    await expect(page.locator("css=#counter")).not.toContainText("?");
  });
});
