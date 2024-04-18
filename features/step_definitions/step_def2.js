const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const assert = require('assert'); 

Before(async function(){
    // make api call using tags
    // store the link u get int reponse as global variable
    // pass this global variable link to 

    // dummy get api call 

    // https://dummy-get-link?email="admin@gmail.com"
    // response :{
        // link
    // }
})

Given('I am on the login screen', async function () {
  await this.driver.get('https://example.com/login');
});


Given('I am on the password reset screen', async function () {
    await driver.get(global.forgot_password_link); 
});

When("I click on {string} button", async function (button) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(button); 
        if (check) {
            let buttonElement;
    
            switch(button) {
                case 'Forgot Password':
                    buttonElement = await wait(until.elementLocated(By.css('[data-testid=Forgot_Password')));
                    break;
                case 'Reset Password':
                    buttonElement = await wait(until.elementLocated(By.css('[data-testid=Reset_Password')));
                    break;
                default:
                    console.log('Invalid button text');
                    return; 
            }
            await buttonElement.click();
        }
    }
});


When('I enter my email as {string}', async function (invalid_email){
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="email"]')))
    await driver.wait(until.elementIsVisible(element))
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    element.sendKeys(invalid_email)
});

When('I enter my new password as {string}', async function (newPassword) {
    let passwordInput = await driver.wait(until.elementLocated(By.css('[data-testid="new-password"]')));
    await driver.wait(until.elementIsVisible(passwordInput));
    await passwordInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await passwordInput.sendKeys(newPassword);
});

When('I enter confirm password as {string}', async function (confirmPassword) {
    let confirmPasswordInput = await driver.wait(until.elementLocated(By.css('[data-testid="confirm-password"]')));
    await driver.wait(until.elementIsVisible(confirmPasswordInput));
    await confirmPasswordInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await confirmPasswordInput.sendKeys(confirmPassword);
});

When('I enter my password as {string}', async function (Password) {
    let PasswordInput = await driver.wait(until.elementLocated(By.css('[data-testid="password"]')));
    await driver.wait(until.elementIsVisible(PasswordInput));
    await passwordInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await PasswordInput.sendKeys(Password);
});


Then("I should see a message {string}", async function (message) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(message); 
        if (check) {
              return 'passed'
        }
      }
    });


Then('I should see a error message {string}', async function (messagePlaceholder) {
    let message = messagePlaceholder.replace('<message>', '');
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(message); 
        if (check) {
              return 'passed'
        }
      }
    });
