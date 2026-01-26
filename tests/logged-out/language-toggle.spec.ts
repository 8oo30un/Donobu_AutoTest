/**
 * Note that this test uses tools that require the usage of an LLM, so be
 * sure to have an appropriate LLM API key available. This can be done
 * by providing an environment variable (e.g. OPENAI_API_KEY, ANTHROPIC_API_KEY,
 * or GOOGLE_GENERATIVE_AI_API_KEY) when running the test...
 *
 *    Example: `OPENAI_API_KEY=YOUR_KEY npx playwright test`
 *
 * ...or by configuring a flow runner using the Donobu app.
 */
import { test } from 'donobu';

const title = 'Test for https://dev-dashboard.immerse.online/';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify the language toggle works. Change language to Japanese. Assert that the page shows up in Japanese.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://dev-dashboard.immerse.online/login');
  // Wait for page to fully load before attempting to find language selector
  await page.waitForTimeout(2000);
  // Try to wait for language selector to be visible
  try {
    await page.waitForSelector("[aria-label='Display Language'], div:has-text('ENGLISH'), [role='searchbox'][aria-label='Display Language']", { timeout: 5000 });
  } catch (e) {
    // Language selector might not be visible, continue anyway
  }
  // Clicking on the language selector to open the language options.
  await page
    .find("[aria-label='Display Language']", {
      failover: [
        "[role='searchbox'][aria-label='Display Language']",
        "input[aria-label='Display Language']",
        "(.//div[normalize-space(.)='ENGLISH'])[1]",
        ".//div[contains(text(), 'ENGLISH')]",
        'div.css-18wbxrz',
        'div.css-1a47ai3 > div:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2)',
        ".//div[normalize-space(.)='ENGLISH']",
        "//div[contains(@class, 'Select')]",
        "//div[contains(@class, 'language')]",
      ],
    })
    .click();
  // Wait for dropdown to open and menu items to be visible
  await page.waitForTimeout(1000);
  // Try to wait for menu to be visible
  try {
    await page.waitForSelector("[role='menuitem'], [data-menu-item='true'], button.mantine-Menu-item", { timeout: 3000 });
  } catch (e) {
    // Menu might already be visible, continue
  }
  // Selecting Japanese from the language options to change the display language.
  await page
    .find(".//button[normalize-space(.)='日本語']", {
      failover: [
        "//div[normalize-space(.)='Japanese']",
        "//div[contains(text(), 'Japanese')]",
        ".//button[contains(text(), '日本語')]",
        ".//button[contains(text(), 'Japanese')]",
        "//button[normalize-space(.)='Japanese']",
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        "[role='menuitem']:has-text('Japanese')",
        "[role='menuitem']:has-text('日本語')",
        "[data-menu-item='true']:has-text('Japanese')",
        'button.mantine-Menu-item:has-text("Japanese")',
        'button.mantine-Menu-item:has-text("日本語")',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
