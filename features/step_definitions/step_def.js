const assert = require('assert'); 
const { faker } = require('@faker-js/faker');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

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

  Then('my details should be validated with {string}', async function (message) {
    await driver.wait(until.elementLocated(By.xpath(`//*[text()="${message}"]`)));
  });


  When('I click on {string} button', async function (button) {
    let buttonElement;
    
    switch(button) {
        case 'Submit':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="Submit"]')));
            break;
        case 'verify_phone_number':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="verify_phone_number"]')));
            break;
        case 'Verify_OTP':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="Verify_OTP"]')));
            break;
        case 'Verify_Email':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="Verify_Email"]')));
            break;
        case 'Register':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="Register"]')));
            break;
        case 'Verify_phone':
            buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="Verify_phone"]')));
              break;
        default:
            console.log('Invalid button string');
            return; 
    }

    await buttonElement.click();
});


 When('I should see a popup message saying {string}', async function (message) {
    let popupElement;

    switch(message) {
        case 'First, Middle and Last names are empty':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'OTP sent successfully to phone number':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'OTP sent successfully to email address':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'Email Already Exists':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'Phone Number Already Exists':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'Username Already Exists':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'registersation successful':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'Verification mail sent to registered email':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        case 'Invalid OTP':
            popupElement = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), message)]')));
            break;
        default:
            console.log('Invalid message');
            return;
    }
    assert(popupElement, `Popup message '${message}' not found`);
});

When('I enter my phone number starting with code +91 followed by a 10-digit number', async function () {

  const phoneNumber = '+91' + faker.phone.phoneNumberFormat().replace(/-/g, '').substring(0, 10);
  const phoneNumberInput = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
  await phoneNumberInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await phoneNumberInput.sendKeys(phoneNumber);
});

When('I enter valid first, middle, and last names', async function () {
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const firstNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
  const middleNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
  const lastNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
  await firstNameInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await middleNameInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await lastNameInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await firstNameInput.sendKeys(firstName);
  await middleNameInput.sendKeys(middleName);
  await lastNameInput.sendKeys(lastName);
});


When('the option to resend OTP should be activated after 3 minutes',{ timeout: 3 * 60 * 1000}, async function () {
    
    await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000));
    const resendOTPButton = await driver.wait(until.elementLocated(By.css('[data-testid="resend_otp_button"]')));
    const isEnabled = await resendOTPButton.isEnabled();
    if (isEnabled) {
        console.log("Resend OTP option activated after 3 minutes.");
    } else {
        throw new Error("Resend OTP option is not activated after 3 minutes.");
    }
});

//document.getElementById("myP").style.visibility = "hidden";

When('I enter the 6-digit OTP for validation', async function () {
  const otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="otp"]')));
  const otp = faker.random.numeric({ min: 100000, max: 999999 }).toString();   
  await otpInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await otpInput.sendKeys(otp);
});

Then('I should see the {string} button text updated to {string}', async function (buttonName, expectedText) {
  const button = await driver.wait(until.elementLocated(By.css(`[data-testid="${buttonName}"]`)));
  const buttonText = await button.getText();
  assert.strictEqual(buttonText, expectedText, `Expected "${buttonName}" button text to be "${expectedText}", but found "${buttonText}"`);
});

// When('I enter a valid email address', async function () {
//   const validEmail = faker.internet.email(); /// bharath.shet+random1232137@7edge.com
//   const emailInput = await driver.wait(until.elementLocated(By.css('[data-testid="email_input"]')));
//   await emailInput.clear();
//   await emailInput.sendKeys(validEmail);
// });

When('I enter a valid email address', async function () {
  const prefix = 'bharath.shet+random';
  const randomPart = faker.random.numeric({ min: 100, max: 9999 });
  const domain = '@7edge.com';
  const validEmail = `${prefix}${randomPart}${domain}`;
  
  const emailInput = await this.driver.wait(until.elementLocated(By.css('[data-testid="email"]')));
  
  await emailInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await emailInput.sendKeys(validEmail);
});


When('I enter the invalid 6-digit OTP for {string} validation', async function (validationType) {
    let otpInput;

    switch(validationType) {
        case 'phno':
            otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="phno_otp"]')));
            break;
        case 'email':
            otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="email_otp"]')));
            break;
        default:
            console.log('Invalid validation type');
            return;
    }

    const invalidOTP = faker.datatype.number({ min: 100000, max: 999999 }).toString(); 
    await otpInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await otpInput.sendKeys(invalidOTP);
});

When('I enter the 6-digit OTP for {string} validation', async function (validationType) {
    let otpInput;

    switch(validationType) {
        case 'phno':
            otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="phno_otp"]')));
            break;
        case 'email':
            otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="email_otp"]')));
            break;
        default:
            console.log('Invalid validation type');
            return;
    }
    await otpInput.sendKeys("000000");
});

When('I enter already existing {string}', async function (inputType) {
  let inputField;

  switch(inputType) {
      case 'Username':
          inputField = await driver.wait(until.elementLocated(By.css('[data-testid="username"]')));
          break;
      case 'phonenumber':
          inputField = await driver.wait(until.elementLocated(By.css('[data-testid="phonenumber"]')));
          break;
      case 'email':
          inputField = await driver.wait(until.elementLocated(By.css('[data-testid="email"]')));
          break;
      default:
          console.log('Invalid input type');
          return;
  }
  const existingData = faker.random.word(); 
  await inputField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  await inputField.sendKeys(existingData);
});

//happy

When('I enter my valid basic details', async function () {
  const firstNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
  const middleNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
  const lastNameInput = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
  const usernameInput = await driver.wait(until.elementLocated(By.css('[data-testid="username"]')));

  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName();

  await firstNameInput.sendKeys(firstName);
  await middleNameInput.sendKeys(middleName);
  await lastNameInput.sendKeys(lastName);
  await usernameInput.sendKeys(username);
});

When('I enter valid email', async function () {
  const emailInput = await driver.wait(until.elementLocated(By.css('[data-testid="email"]')));
  const validEmail = faker.internet.email();

  await emailInput.sendKeys(validEmail);
});

When('I enter valid phone number', async function () {
  const phoneNumberInput = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
  const validPhoneNumber = faker.phone.phoneNumberFormat();

  await phoneNumberInput.sendKeys(validPhoneNumber);
});

When('I enter valid OTP and verify {string}', async function (inputType) {
  let otpInput;

  switch(inputType) {
      case 'email':
          otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="email_otp"]')));
          break;
      case 'phonenumber':
          otpInput = await driver.wait(until.elementLocated(By.css('[data-testid="phonenumber_otp"]')));
          break;
      default:
          console.log('Invalid input type');
          return;
  }

  await otpInput.sendKeys("000000");

  const verifyButton = await driver.wait(until.elementLocated(By.css('[data-testid="verify_button"]')));
  await verifyButton.click();
});

Then('I should see {string} text to be changed to "{string}"', async function (buttonText, expectedText) {
  const button = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), "${buttonText}")]`)));
  const buttonTextAfterVerification = await button.getText();

  assert.equal(buttonTextAfetVerification, expectedText, "Button text does not match with the actual text");
});
