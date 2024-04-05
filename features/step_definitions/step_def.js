const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the registration page', async function () {
    await driver.get('http://www.amazon.in/ap/register?');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Registration"]')));
});

  When('I enter my First name as {string}', async function (first_name) {
    await new Promise(resolve => setTimeout(resolve, 750));

    await driver.wait(until.elementLocated(By.css('[fName_id="first_name"]'))).sendKeys(first_name);
  });

  When('I enter my Middle name as {string}', async function (middle_name) {
    await new Promise(resolve => setTimeout(resolve, 750));

    await driver.wait(until.elementLocated(By.css('[mName_id="middle_name"]'))).sendKeys(middle_name);
  });

  When('I enter my Last name as {string}', async function (last_name) {
    await new Promise(resolve => setTimeout(resolve, 750));

    await driver.wait(until.elementLocated(By.css('[lName_id="last_name"]'))).sendKeys(last_name);
  });

  When('I enter my username as {string}', async function (username) {
    await new Promise(resolve => setTimeout(resolve, 750));

    await driver.wait(until.elementLocated(By.css('[userName_id="username"]'))).sendKeys(username);
  });

  When('I enter my email as {string}', async function (email) {
    await new Promise(resolve => setTimeout(resolve, 750));

    await driver.wait(until.elementLocated(By.css('[email_id="email"]'))).sendKeys(email);
  });


  Then('I click on {string} button', async function (Submit) {
    await driver.wait(until.elementLocated(By.css('[submit_id="Submit"]'))).click();
  });


  Then('my details should be validated with {string}', function (message) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

