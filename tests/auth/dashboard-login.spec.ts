import { test, expect } from 'donobu';

const title = 'immerse-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in to b2b dashboard
Enter Email: {{$.env.EMAIL}}
Enter Password: {{$.env.PASSWORD}}
Click on Log In
Verify user lands on Dashboard home page by asserting the words "Learning Summary" are displayed on the page`,
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
  
  // Navigate to the URL and wait for the network to become idle.
  await page.goto('https://dev-dashboard.immerse.online', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(15000);
  
  // Take screenshot before login
  await page.screenshot({ path: 'test-results/before-login.png', fullPage: true });
  
  // Entering the email address as specified in the objective to log in to the b2b dashboard.
  const emailInput = await page
    .find("[placeholder='Email']", {
      failover: [
        'input[type="email"]',
        'input[name="email"]',
        '#email',
        'div:nth-of-type(1) > input',
      ],
    });
  await emailInput.inputText('sample.hradmin.readonly.6@immerse.online');
  console.log('Email entered');
  
  // Verify email was entered
  const emailValue = await emailInput.inputValue().catch(() => '');
  console.log(`Email value: ${emailValue}`);
  
  // Entering the password as specified in the objective to complete the login credentials for the b2b dashboard.
  const passwordInput = await page
    .find("[placeholder='Password']", {
      failover: [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'div:nth-of-type(2) > input',
      ],
    });
  await passwordInput.inputText(password);
  console.log('Password entered');
  
  // Verify password was entered (check if field has value, but don't log the actual password)
  const passwordLength = await passwordInput.inputValue().then(v => v.length).catch(() => 0);
  console.log(`Password field length: ${passwordLength}`);
  
  if (passwordLength === 0) {
    await page.screenshot({ path: 'test-results/password-not-entered.png', fullPage: true });
    throw new Error('Password was not entered into the password field!');
  }
  // Clicking the Login button to submit the credentials and proceed to the dashboard as specified in the objective.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: [
        'button[type="submit"]',
        ".//button[contains(text(), 'Log')]",
        'button',
      ],
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
  // Waiting for the login process to complete and the page to redirect to the dashboard after clicking the Login button.
  await page.waitForURL('**/dashboard**', { timeout: 90000 });
  // Verifying that the user has successfully landed on the Dashboard home page by checking for the presence of "Learning Summary" text as specified in the objective.
  await expect(page.getByText('Learning Summary')).toBeVisible();
  // Saving the browser storage state to a file for future use in tests.
  await page.context().storageState({ path: "login-state.json" });

});
