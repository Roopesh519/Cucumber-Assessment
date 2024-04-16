const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');

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


When('I click on {string} button', async function (button) {
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
});

When('I enter my email as {string}', async function (invalid_email){
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="email"]')))
    await driver.wait(until.elementIsVisible(element))
    element.sendKeys(invalid_email)
});

When('I enter my new password as {string}', async function (newPassword) {
    let passwordInput = await driver.wait(until.elementLocated(By.css('[data-testid="password"]')));
    await driver.wait(until.elementIsVisible(passwordInput));
    await passwordInput.sendKeys(newPassword);
});

When('I enter confirm password as {string}', async function (confirmPassword) {
    let confirmPasswordInput = await driver.wait(until.elementLocated(By.css('[data-testid="confirm-password"]')));
    await driver.wait(until.elementIsVisible(confirmPasswordInput));
    await confirmPasswordInput.sendKeys(confirmPassword);
});

When('I enter new password as {string}', async function (newPassword) {
    let passwordInput = await driver.wait(until.elementLocated(By.css('[data-testid="password"]')));
    await driver.wait(until.elementIsVisible(passwordInput));
    await passwordInput.sendKeys(newPassword);
});

When('I enter my password as {string}', async function (Password) {
    let PasswordInput = await driver.wait(until.elementLocated(By.css('[data-testid="confirm-password"]')));
    await driver.wait(until.elementIsVisible(PasswordInput));
    await PasswordInput.sendKeys(Password);
});


When('I should see a message {string}', async function (message) {
    let element;

    switch(message) {
        case 'Login in successful':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'reset email has been sent':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'Password updated successfully':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'Invalid Email Address':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
            
        default:
            console.log('Invalid message');
            return;
    }

    // implement page source
    assert(element, `Element with message '${message}' not found`);
});

// changed --------------------


Then('I should see a message {string}', async function (messagePlaceholder) {
    let element;

    let message = messagePlaceholder.replace('<message>', '');

    switch(message) {
        
        default:
            console.log('Invalid message');
            return;
    }
    assert(element, `Element with message '${message}' not found`);
});

Then('I should see a message {string}', async function (messagePlaceholder) {

    let message = messagePlaceholder.replace('<message>', '');

    let element;

    switch(message) {
        case 'password does not match':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'password requires atleast 1 special character':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'Password requires atleast 1 number':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'Password requires atleast 1 uppercase letter':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'password requires atleast 1 lowercase letter':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'password requires atleast 8 characters':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        case 'password should not exceed 12 character':
            element = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), ${message})]`)));
            break;
        default:
            console.log('Invalid message');
            return;
    }
    assert(element, `Element with message '${message}' not found`);
});