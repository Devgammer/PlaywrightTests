import { before } from "node:test";
import AuthController from "../api/controllers/AuthController";

const { test, expect } = require("@playwright/test");
let authController: AuthController;
const testUser = {
  email: "dkolokhin+1@gmail.com",
  password: "Cypress8067",
};

test.describe("Private with controllers", () => {
  let sid: string;

  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    sid = await AuthController.getAuthCookie(testUser.email, testUser.password);
    expect(sid).not.toBeUndefined();
  });
});

test("mock response body ", async ({ page }) => {
  const mockedProfileData = {
    id: 12345,
    name: "Mark Steinberg",
    email: "dkolokhin+1@gmail.com",
    phone: "+380501234567",
    avatar: "https://via.placeholder.com/150/0066cc/ffffff?text=TU",
    role: "admin",
  };

  await page.route("**/api/users/profile", async (route) => {
    if (route.request().method() === "GET") {
      console.log("Перехоплено запит до профілю користувача");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockedProfileData),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("https://qauto.forstudy.space/panel/profile");

  await page.waitForLoadState("networkidle");

  console.log("Mocked files test");

  const nameElement = page
    .locator('[data-testid="user-name"], .user-name, h1, h2')
    .first();
  if (await nameElement.isVisible()) {
    await expect(nameElement).toContainText(mockedProfileData.name);
    console.log(`✓ correct name: ${mockedProfileData.name}`);
  }
});

const BASE_URL = "https://qauto.forstudy.space";
const API_ENDPOINT = "/api/cars";

test.describe("Car Creation API Tests", () => {
  let request;
  let authToken;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const loginResponse = await request.post("/api/auth/signin", {
      data: {
        email: "dkolokhin+1@gmail.com",
        password: "Cypress8067",
      },
    });

    if (loginResponse.ok()) {
      const loginData = await loginResponse.json();
      authToken = loginData.data?.jwtToken || loginData.token;

      await request.dispose();
      request = await playwright.request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test("Should create a car successfully with valid data", async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 15000,
    };

    const response = await request.post(API_ENDPOINT, {
      data: carData,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("status", "ok");
    expect(responseBody).toHaveProperty("data");
    expect(responseBody.data).toHaveProperty("id");
    expect(responseBody.data).toHaveProperty("carBrandId", carData.carBrandId);
    expect(responseBody.data).toHaveProperty("carModelId", carData.carModelId);
    expect(responseBody.data).toHaveProperty("mileage", carData.mileage);
    expect(responseBody.data).toHaveProperty("carCreatedAt");

    console.log("Created car:", responseBody.data);
  });
});

test("Should return error when creating car with invalid data", async () => {
  const invalidCarData = {
    carBrandId: "invalid",
    carModelId: -1,
    mileage: -5000,
  };

  const response = await request.post(API_ENDPOINT, {
    data: invalidCarData,
  });

  expect(response.status()).toBe(400);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("status", "error");
  expect(responseBody).toHaveProperty("message");

  expect(responseBody.message).toContain("Invalid");

  console.log("Validation error response:", responseBody);
});

test("Should return error when creating car with missing required fields", async () => {
  const incompleteCarData = {
    mileage: 10000,
  };

  const response = await request.post(API_ENDPOINT, {
    data: incompleteCarData,
  });

  expect(response.status()).toBe(400);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("status", "error");
  expect(responseBody).toHaveProperty("message");

  const errorMessage = responseBody.message.toLowerCase();
  expect(errorMessage).toMatch(/required|missing|brand|model/);

  console.log("Missing fields error response:", responseBody);
});
