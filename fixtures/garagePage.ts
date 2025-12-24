import { test as base, Page } from "@playwright/test";
export class GaragePage {
  constructor(public readonly page: Page) {}

  get addCarButton() {
    return this.page.locator('button:has-text("Add car")');
  }
  get carBrandSelect() {
    return this.page.locator("#addCarBrand");
  }
  get carModelSelect() {
    return this.page.locator("#addCarModel");
  }
  get mileageInput() {
    return this.page.locator("#addCarMileage");
  }
  get addButton() {
    return this.page.locator('button:has-text("Add")');
  }
  get carsList() {
    return this.page.locator(".car-item");
  }
  get emptyGarageMessage() {
    return this.page.locator('text="You don\'t have any cars in your garage"');
  }
  async goto() {
    await this.page.goto("/panel/garage");
  }
  async addCar(brand: string, model: string, mileage: string) {
    await this.addCarButton.click();

    await this.carBrandSelect.selectOption({ label: brand });

    await this.page.waitForTimeout(1000);
    await this.carModelSelect.selectOption({ label: model });

    await this.mileageInput.fill(mileage);

    await this.addButton.click();
  }
  async getCarCount() {
    return await this.carsList.count();
  }
  async getCarInfo(index: number = 0) {
    const car = this.carsList.nth(index);
    const brand = await car.locator(".car-brand").textContent();
    const model = await car.locator(".car-model").textContent();
    const mileage = await car.locator(".car-mileage").textContent();
    return { brand, model, mileage };
  }
}
type TestFixtures = {
  userGaragePage: GaragePage;
};
export const test = base.extend<TestFixtures>({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.goto();

    await use(garagePage);
  },
});

export { expect } from "@playwright/test";
