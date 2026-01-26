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
import { test, expect } from 'donobu';
import { getBrowserStorageStateFixture } from 'donobu';

const title = 'dashboard-deep-translations-check';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify the language toggle works. Change language to Japanese. Assert that the dashboard shows up in Japanese. Analyze text and flag any of the non-translated text on the page. If there's any non translated text, fail the test.`,
    },
  ],
};
test.extend({
  storageState: getBrowserStorageStateFixture({
    type: 'name',
    value: 'immerse-login',
  }),
})(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://dev-dashboard.immerse.online/dashboard');
  // Waiting for the page to load completely.
  await page.waitForTimeout(5000);
  // Clicking the language selector to open the language options.
  await page.clickElement({
    selector: {
      element: [
        "[aria-label='Display\\ Language']",
        "[placeholder='Language']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div > div > input',
        '#mantine-r1',
        "[data-mantine-stop-propagation='false']",
        "input[data-mantine-stop-propagation='false']",
        'div > input:nth-of-type(1)',
        'input',
        'div > :nth-child(2)',
      ],
      frame: null,
    },
  });
  // Selecting 'Japanese' from the language dropdown to change the display language of the dashboard.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r1-1',
        "//div[normalize-space(.)='Japanese']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(2) > div > div > div > div > div > div:nth-of-type(2)',
        'div > div:nth-of-type(2)',
        'div > :nth-child(2)',
        'div',
      ],
      frame: null,
    },
  });
  // Asserting that the dashboard title is now in Japanese to confirm the language change.
  await expect(page.getByText('ダッシュボード')).toBeVisible();
  // Analyzing the page text to identify any non-translated text after changing the language to Japanese.
  await page.analyzePageText({
    analysisToRun: 'Identify any text on the page that is not in Japanese.',
    additionalRelevantContext:
      'The expected language of the page is Japanese. I am looking for any text that is still in English.',
  });
});
