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
import { test } from "donobu";

const title = "view-learners-tray";
const details = {
  annotation: [
    {
      type: "objective",
      description: `Log in and view Learners tray Test:

Click on Learners Tab
Change Timeframe to "All Time"
Wait for Learners to load
Change "Per Page" to 50
Wait for Learners to load
Once loaded, click on TOS once
Click on the first users email address
Change Timeframe to "All Time"
Assert that Time on Site Total is greater than 0.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto("https://dev-dashboard.immerse.online/dashboard");
  // Waiting for the page to fully load as I can see a loading spinner, which indicates the dashboard is still loading before I can proceed with clicking on the Learners tab.
  await page.waitForTimeout(3000);
  // Clicking on the Learners tab as the first step in the objective to access the Learners tray and begin the test sequence.
  await page.clickElement({
    selector: {
      element: [
        "#__next > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)",
        ".//button[normalize-space(.)='Learners']",
        "div.mantine-xg7kom > button:nth-of-type(2)",
        "div.mantine-yx7xue > div:nth-of-type(1) > button:nth-of-type(2)",
        "div.mantine-2pm4e4 > div > div:nth-of-type(1) > button:nth-of-type(2)",
        "div.mantine-le2skq > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)",
        "div.c-ejwOqd > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)",
        "[data-button='true']",
        "button.mantine-UnstyledButton-root",
      ],
      frame: null,
    },
  });
  // Changing the timeframe to "All Time" as required by the objective, which is currently set to "Last 30 days".
  await page.clickElement({
    selector: {
      element: [
        "#mantine-rg",
        "div:nth-of-type(2) > div > div > [data-mantine-stop-propagation='false']",
        "div:nth-of-type(2) > div > div > input.mantine-Input-input",
        "div.mantine-1rlbqtv > div:nth-of-type(2) > div > div > input",
        "div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input",
        "div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input",
        "div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input",
        "[data-mantine-stop-propagation='false']",
        "input.mantine-Input-input",
      ],
      frame: null,
    },
  });
  // Selecting "All Time" from the timeframe dropdown to change from "Last 30 days" as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        "#mantine-rg-5",
        "#mantine-rg-items > div:nth-of-type(1) > div > div > div:nth-of-type(6)",
        ".//div[normalize-space(.)='All Time']",
        "div.mantine-1325v3c > div:nth-of-type(6)",
        "div.mantine-xlwgkm > div > div > div:nth-of-type(6)",
        "div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)",
        "[role='option']",
        "div.mantine-12zgr9",
      ],
      frame: null,
    },
  });
  // Waiting for the learners data to load after changing the timeframe to "All Time" as required by the objective before proceeding to change the "Per Page" setting.
  await page.waitForTimeout(3000);
  // Clicking on the "Per page" dropdown to change it from 10 to 50 as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        "#mantine-rl-target",
        "#__next > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button",
        ".//button[normalize-space(.)='10']",
        "div:nth-of-type(4) > div:nth-of-type(1) > [data-button='true']",
        "div:nth-of-type(4) > div:nth-of-type(1) > button.mantine-UnstyledButton-root",
        "div.mantine-11argd8 > div:nth-of-type(1) > button",
        "div.mantine-1hv2vg > div:nth-of-type(4) > div:nth-of-type(1) > button",
        "div.mantine-1ywgif7 > div > div:nth-of-type(4) > div:nth-of-type(1) > button",
        "div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button",
        "div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button",
        "[data-button='true']",
        "button.mantine-UnstyledButton-root",
      ],
      frame: null,
    },
  });
  // Selecting "50" from the "Per page" dropdown menu to change from 10 to 50 as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        "#mantine-rl-dropdown > div > button:nth-of-type(3)",
        ".//button[normalize-space(.)='50']",
        "div.mantine-11argd8 > div:nth-of-type(1) > div > div > button:nth-of-type(3)",
        "div.mantine-1hv2vg > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)",
        "div.mantine-1ywgif7 > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)",
        "div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)",
        "[role='menuitem']",
        "[data-menu-item='true']",
        "button.mantine-Menu-item",
      ],
      frame: null,
    },
  });
  // Waiting for the learners data to load after changing the "Per Page" setting to 50 as required by the objective before proceeding to click on TOS column.
  await page.waitForTimeout(3000);
  // Clicking on the TOS (HH:MM) column header once as required by the objective to sort the learners by Time on Site.
  await page.clickElement({
    selector: {
      element: [
        "tr.mantine-t52jw9 > th:nth-of-type(8)",
        "table.mantine-k1avq1 > thead > tr > th:nth-of-type(8)",
        "div.mantine-ilrge8 > table > thead > tr > th:nth-of-type(8)",
        "div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)",
        "div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)",
        "div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)",
        "th.mantine-1lmsj13",
      ],
      frame: null,
    },
  });
  // Waiting for the learners data to load after clicking on the TOS column as I can see there's a loading spinner and the table shows "0 results", indicating the data is still loading.
  await page.waitForTimeout(5000);
  // Clicking on the first user's email address (sample.coach.learner.6@immerse.online) as required by the objective to access their individual learner details.
  await page.clickElement({
    selector: {
      element: [
        "table.mantine-k1avq1 > tbody > tr:nth-of-type(1)",
        "div.mantine-ilrge8 > table > tbody > tr:nth-of-type(1)",
        "div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",
        "div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",
        "div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",
        "div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",
        "body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",
        "tr.mantine-1uspfz7",
      ],
      frame: null,
    },
  });
  // Asserting that the Time on Site Total is greater than 0 as required by the final step of the objective. I can see in the learner details panel that the "Lifetime Total (HH:MM)" shows "67:43" which is clearly greater than 0.
  await page.visuallyAssert({
    assertionToTestFor: "Assert that Time on Site Total is greater than 0.",
  });
});
