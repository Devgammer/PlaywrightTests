import test, { expect } from '@playwright/test';
import { userList } from '../test-data/users';

test.describe("Name field tests", () => {
 test('Successful sign in',async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  });

  });

test("Valid name", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  const validName = "Иван";
  const signupName = page.locator('#signupName');
  await signupName.waitFor({ state: 'visible' });
    await signupName.fill(validName);
});

test("Name required", async ({ page }) => {
  const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  const signupName = page.locator('#signupName');
  await signupName.focus();
  await signupName.blur();
  await expect(page.locator('div.invalid-feedback', { hasText: 'Name required' })).toBeVisible();
});

test('Validate short name length', async ({ page }) => {
    const nameInput = page.locator('#signupName');
    const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    await expect(nameInput).toBeVisible();
    await nameInput.fill('A');
       await nameInput.blur();
       await expect(nameInput).toHaveClass(/is-invalid/);
        const errorMessage = page.locator('.invalid-feedback');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Name has to be from 2 to 20 characters long');
  });

  test('Border color red', async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const nameInput = page.locator('#signupName');
       await nameInput.clear();
    await nameInput.focus();
    await nameInput.blur();
      await page.waitForTimeout(100);
       const borderColor = await nameInput.evaluate(el => 
      window.getComputedStyle(el).borderColor
    );
       expect(borderColor).toBe('rgb(220, 53, 69)');
  });

test.describe("Last name field tests", () => {
test("Valid Last name", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  const validLastName = "Иванов";
  const signupName = page.locator('#signupLastName');
  await signupName.waitFor({ state: 'visible' });
    await signupName.fill(validLastName);
});
  });

  test("Last name required", async ({ page }) => {
  const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  const signupName = page.locator('#signupLastName');
  await signupName.focus();
  await signupName.blur();
  await expect(page.locator('div.invalid-feedback', { hasText: 'Last name required' })).toBeVisible();
});

test('Validate short name length for last name field', async ({ page }) => {
    const nameInput = page.locator('#signupLastName');
    const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    await expect(nameInput).toBeVisible();
    await nameInput.fill('A');
       await nameInput.blur();
       await expect(nameInput).toHaveClass(/is-invalid/);
        const errorMessage = page.locator('.invalid-feedback');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Last name has to be from 2 to 20 characters long');
  });
   test('Border color red for last name field', async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const nameInput = page.locator('#signupLastName');
       await nameInput.clear();
    await nameInput.focus();
    await nameInput.blur();
      await page.waitForTimeout(100);
       const borderColor = await nameInput.evaluate(el => 
      window.getComputedStyle(el).borderColor
    );
       expect(borderColor).toBe('rgb(220, 53, 69)');
  });

test.describe("Email field tests", () => {
test("Email is invalid", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const emailInput = page.locator('#signupEmail');
       await emailInput.clear();
    await emailInput.fill('invalid-email');
    await emailInput.blur();
       await expect(emailInput).toHaveClass(/is-invalid/);
});
  });

  test("Email is valid", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const emailInput = page.locator('#signupEmail');
       await emailInput.clear();
    await emailInput.fill('user@example.com');
    await emailInput.blur();
       await expect(emailInput).toHaveClass(/ng-valid/);
       });

        test('Border color red for the email field', async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const nameInput = page.locator('#signupEmail');
       await nameInput.clear();
    await nameInput.focus();
    await nameInput.blur();
      await page.waitForTimeout(100);
       const borderColor = await nameInput.evaluate(el => 
      window.getComputedStyle(el).borderColor
    );
       expect(borderColor).toBe('rgb(220, 53, 69)');
  });

  test.describe("Password field tests", () => {
test("Password is invalid", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const emailInput = page.locator('#signupPassword');
       await emailInput.clear();
    await emailInput.fill('invalid-password');
    await emailInput.blur();
       await expect(emailInput).toHaveClass(/is-invalid/);
});
  });

    test('Border color red for the password field', async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const nameInput = page.locator('#signupPassword');
       await nameInput.clear();
    await nameInput.focus();
    await nameInput.blur();
      await page.waitForTimeout(100);
       const borderColor = await nameInput.evaluate(el => 
      window.getComputedStyle(el).borderColor
    );
       expect(borderColor).toBe('rgb(220, 53, 69)');
  });

test('Password without capital letter', async ({ page }) => {
    const passwordInput = page.locator('#signupPassword');
    
    const passwordsWithoutCapital = [
      'password1',     
      'mypass123',     
      'test1password', 
      'admin2024',     
      'user1pass',    
      'hello5world',   
      'a1',            
      'pass1word'      
    ];
    
    for (const password of passwordsWithoutCapital) {
      await passwordInput.clear();
      await passwordInput.fill(password);
      await passwordInput.blur();
      
   
      await expect(passwordInput).toHaveClass(/is-invalid/);
      await expect(passwordInput).toHaveClass(/ng-invalid/);
      
      console.log(`✓ Password without capital letter rejected: "${password}"`);
       }
  });

test('Password without small letter', async ({ page }) => {
    const passwordInput = page.locator('#signupPassword');
    
    const passwordsWithoutSmall = [
      'PASSWORD1',    
      'MYPASS123',     
      'TEST1PASSWORD', 
      'ADMIN2024',    
      'USER1PASS',     
      'HELLO5WORLD',  
      'A1',           
      'PASS1WORD'      
    ];
    
    for (const password of passwordsWithoutSmall) {
      await passwordInput.clear();
      await passwordInput.fill(password);
      await passwordInput.blur();
      
      
      await expect(passwordInput).toHaveClass(/is-invalid/);
      await expect(passwordInput).toHaveClass(/ng-invalid/);
      
      console.log(`✓ Password without small letter rejected: "${password}"`);
    }
  });
test('Password without integer', async ({ page }) => {
    const passwordInput = page.locator('#signupPassword');
    
    const passwordsWithoutInteger = [
      'Password',      
      'MyPass',        
      'TestPassword',  
      'Admin',         
      'UserPass',      
      'HelloWorld',    
      'Aa',            
      'PassWord'       
    ];
    
    for (const password of passwordsWithoutInteger) {
      await passwordInput.clear();
      await passwordInput.fill(password);
      await passwordInput.blur();
      
     
      await expect(passwordInput).toHaveClass(/is-invalid/);
      await expect(passwordInput).toHaveClass(/ng-invalid/);
      
      console.log(`✓ Password without integer rejected: "${password}"`);
    }
  });


  test.describe("Re-enter Password field tests", () => {
test("Password is invalid", async ({ page }) => {
   const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const emailInput = page.locator('#signupRepeatPassword');
       await emailInput.clear();
    await emailInput.fill('invalid-password');
    await emailInput.blur();
       await expect(emailInput).toHaveClass(/is-invalid/);
});
  });

    test('Border color red for the Re-enter Password field', async ({ page }) => {
     const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })

  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
    const nameInput = page.locator('#signupRepeatPassword');
       await nameInput.clear();
    await nameInput.focus();
    await nameInput.blur();
      await page.waitForTimeout(100);
       const borderColor = await nameInput.evaluate(el => 
      window.getComputedStyle(el).borderColor
    );
       expect(borderColor).toBe('rgb(220, 53, 69)');
  });

  test("Re-enter password required", async ({ page }) => {
  const signinButton = page.locator('//button[contains(@class,"header_signin")]')
     const emailField = page.getByRole('textbox', { name: 'Email'})
     const passwordlField = page.getByRole('textbox', { name: 'Password'})
    const registrationButton = page.getByRole('button', { name: 'Registration' })
  await page.goto('/');
      await signinButton.click();
      await emailField.fill(userList.mainUser.email)
      await passwordlField.pressSequentially(userList.mainUser.password);
     await registrationButton.click();
  const signupName = page.locator('#signupRepeatPassword');
  await signupName.focus();
  await signupName.blur();
  await expect(page.locator('div.invalid-feedback', { hasText: 'Re-enter password required' })).toBeVisible();
});

