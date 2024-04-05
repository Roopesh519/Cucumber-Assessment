const assert = require('assert'); //assestion funtion import 
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the registration page', async function () {
    await driver.get('http://www.amazon.in/ap/register?');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Registration"]')));
});

  When('I enter my First name as {string}', async function (first_name) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(first_name)
  });

  When('I enter my Middle name as {string}', async function (middle_name) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(middle_name)
  });

  When('I enter my Last name as {string}', async function (last_name) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(last_name)
  });

  When('I enter my username as {string}', async function (username) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(username)
  });

  When('I enter my email as {string}', async function (email) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="email"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(email)
  });


  Then('I click on {string} button', async function (Submit) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="Submit"]')))
    await driver.wait(until.elementIsVisible(element))
    element.click(Submit)
  });


  Then('my details should be validated with {string}', async function (message) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.xpath(`//*[text()="${message}"]`)));
  });

  When('I click on {string} button', async function (string) {
    let element;
    
    switch(string) {
        case 'Submit':
            element = 'Submit';
            break;
        case 'verify_phone_number':
            element = 'verify_phone_number';
            break;
 
        case 'Verify_OTP':
            element = 'Verify_OTP';
            break;

        case 'Verify_Email':
            element = 'Verify';
            break;

        case 'Register':
            element = 'Register';
            break;

        default:
            console.log('Invalid string');
            break;
    }
    await page.click(`#${element}`);
  });
