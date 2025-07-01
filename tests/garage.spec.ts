import { test, expect } from "../fixtures/garagePage";

test.describe("Garage Page Tests", () => {
  test("should display garage page for authenticated user", async ({
    userGaragePage,
  }) => {
    await expect(userGaragePage.page).toHaveURL("/panel/garage");

    await expect(userGaragePage.addCarButton).toBeVisible();
  });

  test("should add a new car to garage", async ({ userGaragePage }) => {
    const initialCarCount = await userGaragePage.getCarCount();

    await userGaragePage.addCar("BMW", "X5", "50000");

    const newCarCount = await userGaragePage.getCarCount();
    expect(newCarCount).toBe(initialCarCount + 1);

    const carInfo = await userGaragePage.getCarInfo(newCarCount - 1);
    expect(carInfo.brand).toContain("BMW");
    expect(carInfo.model).toContain("X5");
    expect(carInfo.mileage).toContain("50000");
  });

  test("should show empty garage message when no cars", async ({
    userGaragePage,
  }) => {
    const carCount = await userGaragePage.getCarCount();

    if (carCount === 0) {
      await expect(userGaragePage.emptyGarageMessage).toBeVisible();
    }
  });

  test("should validate car form fields", async ({ userGaragePage }) => {
    await userGaragePage.addCarButton.click();

    await expect(userGaragePage.carBrandSelect).toBeVisible();
    await expect(userGaragePage.carModelSelect).toBeVisible();
    await expect(userGaragePage.mileageInput).toBeVisible();

    await userGaragePage.addButton.click();
  });
});
