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

const title = 'immerse-verify-data-populates';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify data populates

Change Timeframe to "All Time"
Assert that Number of Learners, Logged in at Least Once, and % Attended Trainer-Led Session are greater than 0.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Waiting for the dashboard page to fully load as it appears to be showing a loading spinner.
  await page.waitForTimeout(3000);
  // Clicking on the Time Frame dropdown to change it from "Last 30 days" to "All Time" as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4',
        "[placeholder='Select Date Range']",
        "div:nth-of-type(2) > div > div > [data-mantine-stop-propagation='false']",
        'div:nth-of-type(2) > div > div > input.mantine-Input-input',
        'div.mantine-wqtrt6 > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        "[data-mantine-stop-propagation='false']",
        'input.mantine-Input-input',
      ],
      frame: null,
    },
  });
  // Selecting "All Time" from the dropdown menu to change the timeframe as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4-5',
        '#mantine-r4-items > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        ".//div[normalize-space(.)='All Time']",
        'div.mantine-1325v3c > div:nth-of-type(6)',
        'div.mantine-xlwgkm > div > div > div:nth-of-type(6)',
        'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        "[role='option']",
        'div.mantine-12zgr9',
      ],
      frame: null,
    },
  });
  // Verifying that the Number of Learners metric is greater than 0 as required by the objective after changing the timeframe to "All Time".
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the Number of Learners value is greater than 0.',
  });
  // Verifying that the "Logged in at Least Once" metric is greater than 0 as required by the objective after changing the timeframe to "All Time".
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the "Logged in at Least Once" value is greater than 0.',
  });
  // Verifying that the "% Attended Trainer-led Classes" metric is greater than 0 as required by the objective after changing the timeframe to "All Time".
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the "% Attended Trainer-led Classes" value is greater than 0.',
  });
});
