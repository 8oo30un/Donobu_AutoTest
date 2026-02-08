import { test, expect } from 'donobu';

const title = 'immerse-b2b-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in with b2b account and verify Nvidia loads:

Enter Email: sample.hradmin.readonly.6@immerse.online
Enter Password: {{$.env.B2B_PASSWORD_READONLY}}
Click on Log In and wait to be redirected.
Assert that the url contains "nvidia"
`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Check if password is set
  const password = process.env.B2B_PASSWORD_READONLY || '';
  if (!password) {
    throw new Error('B2B_PASSWORD_READONLY environment variable is not set!');
  }
  console.log(`Password length: ${password.length}`);
  
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  await page.getByRole('heading', { name: 'Log In' }).waitFor({ state: 'visible', timeout: 90000 });
  // Inputting the provided email address into the email field to log in.
  await page.waitForTimeout(10000);
  
  // Take screenshot before login
  await page.screenshot({ path: 'test-results/before-login.png', fullPage: true });
  
  const emailInput = await page
    .find("[placeholder='Enter your email']", {
      failover: ['input.css-111d7as', 'div.css-1f7apd6 > input'],
    });
  await emailInput.inputText('sample.hradmin.readonly.6@immerse.online');
  console.log('Email entered');
  
  // Verify email was entered
  const emailValue = await emailInput.inputValue().catch(() => '');
  console.log(`Email value: ${emailValue}`);
  
  // Entering the provided password into the password input field to log in.
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
  // Clicking the 'Login' button to proceed with the login process.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: ['button.css-3wz0nu', 'div.css-1fhtl0l > button'],
    })
    .click();
  // Waiting for the login process to complete and the page to redirect to the logged-in page after clicking the Login button.
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

  // Asserting that the current URL contains the word "nvidia" to confirm navigation to nvidia page.
  await expect(page).toHaveURL(/gfn\/desktop/, { timeout: 90000 });

});
