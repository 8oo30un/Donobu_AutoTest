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

username: {{$.env.EMAIL}}
password: {{$.env.PASSWORD}}`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Navigating to the login page to begin the assertion process.
  await page.goto('https://dev-dashboard.immerse.online/login');
  // Asserting that the user is met with a login page by checking for the text 'Log In'.
  await expect(page.getByText('Log In')).toBeVisible();
  // Wait for page to fully load before attempting to find language selector
  await page.waitForTimeout(2000);
  // Try to wait for language selector to be visible
  try {
    await page.waitForSelector("[aria-label='Display Language'], div:has-text('ENGLISH'), [role='searchbox'][aria-label='Display Language']", { timeout: 5000 });
  } catch (e) {
    // Language selector might not be visible, continue anyway
  }
  // Clicking on the display language dropdown to change the language on the login page.
  await page
    .find(".//div[normalize-space(.)='En']", {
      failover: [
        "[aria-haspopup='menu'][aria-expanded='false']",
        "div[aria-haspopup='menu']:has-text('En')",
        "div[aria-haspopup='menu']:has-text('ENGLISH')",
        "[aria-label='Display Language']",
        "[role='searchbox'][aria-label='Display Language']",
        "input[aria-label='Display Language']",
        "(.//div[normalize-space(.)='ENGLISH'])[1]",
        ".//div[contains(text(), 'ENGLISH')]",
        ".//div[contains(text(), 'En')]",
        'div.css-18wbxrz',
        'div.css-1a47ai3 > div:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        ".//div[normalize-space(.)='ENGLISH']",
        "//div[contains(@class, 'Select')]",
        "//div[contains(@class, 'language')]",
      ],
    })
    .click();
  // Wait for dropdown to open
  await page.waitForTimeout(1000);
  // Try to wait for menu items to be visible
  try {
    await page.waitForSelector("[role='menuitem'], [data-menu-item='true'], button.mantine-Menu-item", { timeout: 3000 });
  } catch (e) {
    // Menu might already be visible, continue
  }
  // Changing the display language to Spanish.
  await page
    .find(".//button[normalize-space(.)='Español']", {
      failover: [
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Wait for language change to take effect
  await page.waitForTimeout(1000);
  // Asserting that the display language has been changed to Spanish by checking for Spanish text on the page.
  // Using "Acceso" (Spanish for "Log In") instead of checking for "ESPAÑOL" in the dropdown
  await expect(page.getByText('Acceso')).toBeVisible();
  // Wait for page to fully load before attempting to find language selector
  await page.waitForTimeout(2000);
  // Try to wait for language selector to be visible
  try {
    await page.waitForSelector("[aria-label='Idioma de visualización'], [aria-label='Display Language'], div:has-text('ESPAÑOL'), div:has-text('Es'), [role='searchbox'][aria-label='Display Language'], div.css-1j0a71q:has-text('Es')[aria-haspopup='menu']", { timeout: 5000 });
  } catch (e) {
    // Language selector might not be visible, continue anyway
  }
  // Clicking on the display language dropdown to change the language back to English.
  // Use the same pattern as before but look for "Es" or "Español" text
  await page
    .find(".//div[normalize-space(.)='Es']", {
      failover: [
        "div.css-1j0a71q:has-text('Es')[aria-haspopup='menu']",
        "[aria-haspopup='menu'][aria-expanded='false']",
        "div[aria-haspopup='menu']:has-text('Es')",
        "div[aria-haspopup='menu']:has-text('ESPAÑOL')",
        "[aria-label='Idioma de visualización']",
        "[aria-label='Display Language']",
        "[role='searchbox'][aria-label='Display Language']",
        "input[aria-label='Display Language']",
        "(.//div[normalize-space(.)='ESPAÑOL'])[1]",
        ".//div[contains(text(), 'ESPAÑOL')]",
        ".//div[contains(text(), 'Es')]",
        'div.css-18wbxrz',
        'div.css-1a47ai3 > div:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        ".//div[normalize-space(.)='ESPAÑOL']",
        "//div[contains(@class, 'Select')]",
        "//div[contains(@class, 'language')]",
      ],
    })
    .click();
  // Wait for dropdown to open
  await page.waitForTimeout(1000);
  // Try to wait for menu items to be visible
  try {
    await page.waitForSelector("[role='menuitem'], [data-menu-item='true'], button.mantine-Menu-item", { timeout: 3000 });
  } catch (e) {
    // Menu might already be visible, continue
  }
  // Changing the display language back to English.
  await page
    .find(".//button[normalize-space(.)='English']", {
      failover: [
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(1)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(1)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(1)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(1)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Clicking on the 'Forgot password' link to navigate to the Forgot Password page.
  await page
    .find("[data-testid='login-form-forgot-password-link']", {
      failover: [
        ".//a[normalize-space(.)='Forgot password']",
        "[href='/forgot-password']",
        'div.c-kYaZkY > a',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
      ],
    })
    .click();
  // Asserting that the user is on the Forgot Password page by checking for the text 'Forgot Password?'.
  await expect(page.getByText('Forgot Password?')).toBeVisible();
  // Navigating back to the login page to proceed with the login process.
  await page.goBack();
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  
  if (!email || !password) {
    throw new Error("EMAIL and PASSWORD environment variables must be set");
  }
  
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
    .inputText(email);
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
    .inputText(password);
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
