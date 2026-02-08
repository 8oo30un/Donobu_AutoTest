import { test, expect } from 'donobu';

const title = 'immerse-d2c-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in with d2c account and save authentication state:

Navigate to app.immerse.online
Enter the email of a d2c user: test_stripe_v3_user@immerse.online
Enter the password for that d2c user: {{$.env.D2C_PASSWORD}}
Click on Login
Verify landing at the home page for d2c learners`
    },
  ],
};
test(title, details, async ({ page, context }) => {
  // Check if password is set
  const password = process.env.D2C_PASSWORD || '';
  if (!password) {
    throw new Error('D2C_PASSWORD environment variable is not set!');
  }
  console.log(`Password length: ${password.length}`);
  
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  // Wait for the login page to load
  await page.getByRole('heading', { name: 'Log In' }).waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForTimeout(10000);

  // Take screenshot before login
  await page.screenshot({ path: 'test-results/before-login.png', fullPage: true });

  // Entering the user's email address as part of the login process.
  const emailInput = await page
    .find("[placeholder='Enter your email']", {
      failover: ['input.css-111d7as', 'div.css-1f7apd6 > input'],
    });
  await emailInput.inputText('test_stripe_v3_user@immerse.online');
  console.log('Email entered');
  
  // Verify email was entered
  const emailValue = await emailInput.inputValue().catch(() => '');
  console.log(`Email value: ${emailValue}`);

  // Entering the password and submitting the login form.
  const passwordInput = await page
    .find("[data-testid='passwordinput']", {
      failover: [
        "[placeholder='Enter your password']",
        'input[type="password"]',
        '#mantine-R2kp5aaqm',
      ],
    });
  await passwordInput.inputText(password);
  console.log('Password entered');
  
  // Verify password was entered
  const passwordLength = await passwordInput.inputValue().then(v => v.length).catch(() => 0);
  console.log(`Password field length: ${passwordLength}`);
  
  if (passwordLength === 0) {
    await page.screenshot({ path: 'test-results/password-not-entered.png', fullPage: true });
    throw new Error('Password was not entered into the password field!');
  }

  // Clicking the login button to proceed with the authentication.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: ['button.css-3wz0nu', 'div.css-1fhtl0l > button'],
    })
    .click();
  
  // Wait a bit for login to process
  await page.waitForTimeout(3000);
  // Check current URL for debugging
  const currentUrl = page.url();
  console.log(`Current URL after login click: ${currentUrl}`);
  // Check for error messages
  const errorText = await page.locator('text=/error|invalid|incorrect|failed/i').first().isVisible().catch(() => false);
  if (errorText) {
    const errorMessage = await page.locator('text=/error|invalid|incorrect|failed/i').first().textContent().catch(() => 'Unknown error');
    console.log(`Login error detected: ${errorMessage}`);
    await page.screenshot({ path: 'test-results/login-error.png', fullPage: true });
  }

  // Verify navigation to GFN desktop after login
  await expect(page).toHaveURL(/.*gfn\/desktop/);

  // Save the authentication state
  await context.storageState({ path: 'd2c-login-state.json' });
});
