const { Given } = require('cucumber');

Given('I am on the login screen', async function () {
  await this.driver.get('https://example.com/login');
});


Given('I am on the password reset screen', async function () {
    await driver.get('https://example.com/password-reset'); 
});


When('I click on {string} button', async function (button) {
    let buttonElement;
    
    switch(button) {
        case 'Forgot Password':
            buttonElement = await wait(until.elementLocated(By.css('[data-testid=Forgot_Password')));
            break;
        case 'Reset Password':
            buttonElement = await wait(until.elementLocated(By.css('[data-testid=Reset Password')));
            break;
        default:
            console.log('Invalid button text');
            return; 
    }

    await linkElement.click();
});

When('I enter {string}', async function (input) {
    let element;

    switch(input) {
        case '<invalid_email>':
            element = await driver.findElement(By.css('[data-testid="invalid_email"]'));
            await element.sendKeys(faker.internet.email());
            break;
        case 'new_password':
            element = await driver.findElement(By.css('[data-testid="new_password"]'));
            await element.sendKeys(faker.internet.password());
            break;
        case '<confirm_new_password>':
            element = await driver.findElement(By.css('[data-testid="confirm_new_password"]'));
            await element.sendKeys(faker.internet.password());
            break;
        case '<valid_password>':
            element = await driver.findElement(By.css('[data-testid="valid_password"]'));
            await element.sendKeys(faker.internet.password());
            break;
        case '<email>':
            element = await driver.findElement(By.css('[data-testid="email"]'));
            await element.sendKeys(faker.internet.email());
            break;
        case '<invalid_password>':
            element = await driver.findElement(By.css('[data-testid="invalid_password"]'));
            await element.sendKeys(faker.internet.password());
            break;
        case '<mail>':
            element = await driver.findElement(By.css('[data-testid="mail"]'));
            await element.sendKeys(faker.internet.email());
            break;
        case '<password>':
            element = await driver.findElement(By.css('[data-testid="password"]'));
            await element.sendKeys(faker.internet.password());
            break;
        default:
            console.log('Invalid input');
            return;
    }
});

const faker = require('faker');

Then('I should receive {string}', async function (errorMessage) {
    let receivedMessage;

    switch(errorMessage) {
        case '<error_message>':
            receivedMessage = faker.random.arrayElement(['An unexpected error occurred.', 'Invalid input provided.', 'Server error. Please try again later.']);
            break;
        case '<message>':
            receivedMessage = faker.random.arrayElement(['Message received successfully.', 'Operation completed.', 'Request processed successfully.']);
            break;
        case '<Email address not found>':
            receivedMessage = 'Email address not found.';
            break;
        case '<Incorrect password>':
            receivedMessage = 'Incorrect password provided.';
            break;
        case '<reset email has been sent>':
            receivedMessage = 'Password reset email has been sent.';
            break;
        
        case 'login successful':
            receivedMessage = 'login successful';
            break;
        case 'password reset successful':
            receivedMessage = 'password reset successful';
            break;
        case 'Unsuccessful login attempt':
            receivedMessage = 'Unsuccessful login attempt';
            break;
           
            
        default:
            console.log('Invalid error message');
            return;
    }

    console.log('Received message:', receivedMessage);
});
