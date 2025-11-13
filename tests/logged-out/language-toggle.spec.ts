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

const title = 'Test for https://staging-dashboard.immerse.online/';
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
  await page.goto('https://staging-dashboard.immerse.online/login');
  // Clicking on the language selector to open the language options.
  await page
    .find('#mantine-r0-target', {
      failover: [
        "[aria-label='Display Language']",
        "(.//div[normalize-space(.)='ENGLISH'])[1]",
      ],
    })
    .click();
  // Selecting Japanese from the language options to change the display language.
  await page
    .find('#mantine-r0-dropdown > div > button:nth-of-type(2)', {
      failover: [
        ".//button[normalize-space(.)='日本語']",
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(2)',
      ],
    })
    .click();
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
