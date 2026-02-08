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
  // Navigate to the URL and wait for the network to become idle.
  await page.goto('https://dev-dashboard.immerse.online', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(15000);
  // Entering the email address as specified in the objective to log in to the b2b dashboard.
  // Use data-testid first as it's more stable (same as b2b-login-smoke-test.spec.ts)
  await page
    .find("[data-testid='login-form-email-input']", {
      failover: [
        "[placeholder='Email']",
        'input[type="email"]',
        'input[name="email"]',
        '#email',
        'div:nth-of-type(1) > input',
      ],
    })
    .inputText('sample.hradmin.readonly.6@immerse.online');
  // Entering the password as specified in the objective to complete the login credentials for the b2b dashboard.
  // Use data-testid first as it's more stable (same as b2b-login-smoke-test.spec.ts)
  await page
    .find("[data-testid='login-form-password-input']", {
      failover: [
        "[placeholder='Password']",
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'div:nth-of-type(2) > input',
      ],
    })
    .inputText(process.env.B2B_PASSWORD_READONLY || '');
  // Clicking the Login button to submit the credentials and proceed to the dashboard as specified in the objective.
  // Use data-testid first as it's more stable (same as b2b-login-smoke-test.spec.ts)
  await page
    .find("[data-testid='login-form-submit-button']", {
      failover: [
        ".//button[normalize-space(.)='Login']",
        'button[type="submit"]',
        ".//button[contains(text(), 'Log')]",
        'button',
      ],
    })
    .click();
  // Waiting for the login process to complete and the page to redirect to the dashboard after clicking the Login button.
  await page.waitForURL('**/dashboard**', { timeout: 90000 });
  // Verifying that the user has successfully landed on the Dashboard home page by checking for the presence of "Learning Summary" text as specified in the objective.
  await expect(page.getByText('Learning Summary')).toBeVisible();
  // Saving the browser storage state to a file for future use in tests.
  await page.context().storageState({ path: "login-state.json" });

});
