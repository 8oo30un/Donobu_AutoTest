import { test, expect } from 'donobu';

const title = 'immerse-b2b-dashboard-login-test';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Assert each of these.
As a user:
I am met with a login page.
I can click on Forgot Password and be taken to the Forgot Password page.
I can change my display language and change it back to English
I can login with a user that is set up to access the dashboard.
I land on Dashboard home page and the words "Learning Summary" are displayed on the page

username: sample.hradmin.readonly.6@immerse.online
password: {{$.env.B2B_PASSWORD_READONLY}}`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Navigating to the login page to begin the assertion process.
  await page.goto('https://dev-dashboard.immerse.online/login');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  // Asserting that the user is met with a login page by checking for the text 'Log In'.
  await expect(page.getByText('Log In')).toBeVisible();
  // Clicking on the 'Forgot password' link to navigate to the Forgot Password page.
  await page
    .find("[data-testid='login-form-forgot-password-link']", {
      failover: [
        ".//a[normalize-space(.)='Forgot password']",
        "[href='/forgot-password']",
        'div.c-kYaZkY > a',
      ],
    })
    .click();
  // Asserting that the user is on the Forgot Password page by checking for the text 'Forgot Password?'.
  await expect(page.getByText('Forgot Password?')).toBeVisible();
  // Testing language toggle on forgot password page - Clicking on the display language dropdown to change the language.
  await page
    .find('#mantine-r0-target', {
      failover: [
        "[aria-label='Display Language']",
        ".//div[contains(@class, 'mantine-1j0a71q')]",
        ".//div[normalize-space(.)='En']",
      ],
    })
    .click();
  // Changing the display language to Spanish.
  await page
    .find(".//button[normalize-space(.)='Español']", {
      failover: [
        "[role='menuitem']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Asserting that the display language has been changed to Spanish.
  await expect(page.getByText('Es', { exact: true })).toBeVisible();
  // Clicking on the display language dropdown to change the language back to English.
  await page
    .find('#mantine-r0-target', {
      failover: [
        "[aria-label='Idioma de visualización']",
        ".//div[contains(@class, 'mantine-1j0a71q')]",
        ".//div[normalize-space(.)='Es']",
      ],
    })
    .click();
  // Changing the display language back to English.
  await page
    .find(".//button[normalize-space(.)='English']", {
      failover: [
        "[role='menuitem']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Asserting that the display language has been changed back to English.
  await expect(page.getByText('En', { exact: true })).toBeVisible();
  // Navigating back to the login page to complete the login test.
  await page.goto('https://dev-dashboard.immerse.online/login');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  // Entering the username into the email field for login.
  await page
    .find("[data-testid='login-form-email-input']", {
      failover: [
        "[placeholder='Email']",
        'div:nth-of-type(1) > input.c-gtNREi',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'input.c-gtNREi',
      ],
    })
    .inputText('sample.hradmin.readonly.6@immerse.online');
  // Entering the password into the password field for login.
  await page
    .find("[data-testid='login-form-password-input']", {
      failover: [
        "[placeholder='Password']",
        'div:nth-of-type(2) > input.c-gtNREi',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'input.c-gtNREi',
      ],
    })
    .inputText(process.env.B2B_PASSWORD_READONLY || '');
  // Clicking the login button to log in with the provided credentials.
  await page
    .find("[data-testid='login-form-submit-button']", {
      failover: [
        ".//button[normalize-space(.)='Login']",
        'button.c-gNnAWR',
        'div.c-jhyvPY > button',
        'div.c-gqwkJN > div > button',
        'div.c-ejwOqd > div > div > button',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button',
      ],
    })
    .click();
  // Waiting for the login process to complete and the page to redirect to the dashboard after clicking the Login button.
  await page.waitForURL('**/dashboard**', { timeout: 90000 });
  // Asserting that the user has landed on the Dashboard home page and that the words "Learning Summary" are displayed on the page.
  const learnerSummaryEle = await page.getByText('Learning Summary');
  await learnerSummaryEle.waitFor({ state: 'visible', timeout: 90000 });
  await expect(page.getByText('Learning Summary')).toBeVisible();
  // Saving the browser storage state to a file for future use in tests.
  await page.context().storageState({ path: "b2b-login-state.json" });
});
