import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173";
import path from "path";
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the signin button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name='email']").fill("3@3.com");
  await page.locator("[name='password']").fill("111111");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Succesful")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name = 'name']").fill("TEST HOTEL");
  await page.locator("[name = 'city']").fill("TEST CITY");

  await page.selectOption('select[name="country"]', "India");

  await page
    .locator("[name = 'description']")
    .fill("This is a description for the hotel");

  await page.locator("[name = 'pricePerNight']").fill("100");

  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Fitness Center").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.avif"),
    path.join(__dirname, "files", "2.avif"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await expect(page.getByText("TEST HOTEL")).toBeVisible();
  await expect(
    page.locator(':has-text("This is a description for the hotel")')
  ).toBeVisible();
  // await expect(page.getByText("Hyderabad, India")).toBeVisible();
  // await expect(page.getByText("Price per Night: $3500")).toBeVisible();
});
