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
  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  // Clicking on the language selector to open the language options.
  await page
    .find("img[alt='Language globe icon']", {
      failover: [
        "img[alt='Open language menu']",
        "[aria-label='Display Language']",
        '#mantine-r0-target',
      ],
    })
    .click();
  // Selecting Japanese from the language options to change the display language.
  await page
    .find(".//button[normalize-space(.)='日本語']", {
      failover: [
        '[role="menuitem"]',
        'button.mantine-Menu-item',
        '#mantine-r0-dropdown > div > button:nth-of-type(2)',
      ],
    })
    .click();
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
