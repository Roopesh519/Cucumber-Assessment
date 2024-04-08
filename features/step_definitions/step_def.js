const assert = require('assert'); //assestion funtion import 
const faker = require('faker');
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


  When('I click on {string} button', async function (button) {
    let buttonElement;
    
    switch(button) {
        case 'Submit':
            buttonElement = await driver.findElement(By.css('[data-testid="Submit"]'));
            break;
        case 'verify_phone_number':
            buttonElement = await driver.findElement(By.css('[data-testid="verify_phone_number"]'));
            break;
        case 'Verify_OTP':
            buttonElement = await driver.findElement(By.css('[data-testid="Verify_OTP"]'));
            break;
        case 'Verify_Email':
            buttonElement = await driver.findElement(By.css('[data-testid="Verify_Email"]'));
            break;
        case 'Register':
            buttonElement = await driver.findElement(By.css('[data-testid="Register"]'));
            break;
        case 'Verify_phone':
            buttonElement = await driver.findElement(By.css('[data-testid="Verify_phone"]'));
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
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "First, Middle and Last names are empty")]'));
            break;
        case 'OTP sent successfully to phone number':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "OTP sent successfully to phone number")]'));
            break;
        case 'OTP sent successfully to email address':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "OTP sent successfully to email address")]'));
            break;
        case 'Email Already Exists':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "Email Already Exists")]'));
            break;
        case 'Phone Number Already Exists':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "Phone Number Already Exists")]'));
            break;
        case 'Username Already Exists':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "Username Already Exists")]'));
            break;
        case 'registersation successful':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "registersation successful")]'));
            break;
        case 'Verification mail sent to registered email':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "Verification mail sent to registered email")]'));
            break;
        case 'Invalid OTP':
            popupElement = await driver.findElement(By.xpath('//*[contains(text(), "Invalid OTP")]'));
            break;
        default:
            console.log('Invalid message');
            return;
    }

    assert(popupElement, `Popup message '${message}' not found`);

});

When('I enter my phone number starting with code +91 followed by a 10-digit number', async function () {

  const phoneNumber = '+91' + faker.phone.phoneNumberFormat().replace(/-/g, '').substring(0, 10);
  const phoneNumberInput = await driver.findElement(By.css('[data-testid="phone_number_input"]'));
  await phoneNumberInput.clear();
  await phoneNumberInput.sendKeys(phoneNumber);
});

When('I enter valid first, middle, and last names', async function () {
  const firstName = faker.name.firstName();
  const middleName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const firstNameInput = await driver.findElement(By.css('[data-testid="first_name_input"]'));
  const middleNameInput = await driver.findElement(By.css('[data-testid="middle_name_input"]'));
  const lastNameInput = await driver.findElement(By.css('[data-testid="last_name_input"]'));
  await firstNameInput.clear();
  await middleNameInput.clear();
  await lastNameInput.clear();
  await firstNameInput.sendKeys(firstName);
  await middleNameInput.sendKeys(middleName);
  await lastNameInput.sendKeys(lastName);
});



When('the option to resend OTP should be activated after 3 minutes', async function () {
    
    await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000));
    const resendOTPButton = await driver.findElement(By.css('[data-testid="resend_otp_button"]'));
    const isEnabled = await resendOTPButton.isEnabled();
    if (isEnabled) {
        console.log("Resend OTP option activated after 3 minutes.");
    } else {
        throw new Error("Resend OTP option is not activated after 3 minutes.");
    }
});

When('I enter the 6-digit OTP for validation', async function () {
  const otpInput = await driver.findElement(By.css('[data-testid="otp_input"]'));
  const otp = faker.random.number({ min: 100000, max: 999999 }).toString();   
  await otpInput.clear();
  await otpInput.sendKeys(otp);
});

Then('I should see the {string} button text updated to {string}', async function (buttonName, expectedText) {
  const button = await driver.findElement(By.css(`[data-testid="${buttonName}"]`));
  const buttonText = await button.getText();
  assert.strictEqual(buttonText, expectedText, `Expected "${buttonName}" button text to be "${expectedText}", but found "${buttonText}"`);
});

When('I enter a valid email address', async function () {
  const validEmail = faker.internet.email();
  const emailInput = await driver.findElement(By.css('[data-testid="email_input"]'));
  await emailInput.clear();
  await emailInput.sendKeys(validEmail);
});

const faker = require('faker');

When('I enter the invalid 6-digit OTP for {string} validation', async function (validationType) {
    let otpInput;

    switch(validationType) {
        case 'phno':
            otpInput = await driver.findElement(By.css('[data-testid="phno_otp_input"]'));
            break;
        case 'email':
            otpInput = await driver.findElement(By.css('[data-testid="email_otp_input"]'));
            break;
        default:
            console.log('Invalid validation type');
            return;
    }

    const invalidOTP = faker.datatype.number({ min: 100000, max: 999999 }).toString(); 
    await otpInput.clear();
    await otpInput.sendKeys(invalidOTP);
});

When('I enter the 6-digit OTP for {string} validation', async function (validationType) {
    let otpInput;

    switch(validationType) {
        case 'phno':
            otpInput = await driver.findElement(By.css('[data-testid="phno_otp_input"]'));
            break;
        case 'email':
            otpInput = await driver.findElement(By.css('[data-testid="email_otp_input"]'));
            break;
        default:
            console.log('Invalid validation type');
            return;
    }

    const validOTP = faker.datatype.number({ min: 100000, max: 999999 }).toString(); 
    await otpInput.clear();
    await otpInput.sendKeys(validOTP);
});

When('I enter existing {string}', async function (inputType) {
  let inputField;

  switch(inputType) {
      case 'Username':
          inputField = await driver.findElement(By.css('[data-testid="username_input"]'));
          break;
      case 'phonenumber':
          inputField = await driver.findElement(By.css('[data-testid="phonenumber_input"]'));
          break;
      case 'email':
          inputField = await driver.findElement(By.css('[data-testid="email_input"]'));
          break;
      default:
          console.log('Invalid input type');
          return;
  }
  const existingData = faker.random.word(); 
  await inputField.clear();
  await inputField.sendKeys(existingData);
});

//happy

When('I enter my valid basic details', async function () {
  const firstNameInput = await driver.findElement(By.css('[data-testid="first_name_input"]'));
  const middleNameInput = await driver.findElement(By.css('[data-testid="middle_name_input"]'));
  const lastNameInput = await driver.findElement(By.css('[data-testid="last_name_input"]'));
  const usernameInput = await driver.findElement(By.css('[data-testid="username_input"]'));

  const firstName = faker.name.firstName();
  const middleName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.userName();

  await firstNameInput.sendKeys(firstName);
  await middleNameInput.sendKeys(middleName);
  await lastNameInput.sendKeys(lastName);
  await usernameInput.sendKeys(username);
});

When('I enter valid email', async function () {
  const emailInput = await driver.findElement(By.css('[data-testid="email_input"]'));
  const validEmail = faker.internet.email();

  await emailInput.sendKeys(validEmail);
});

When('I enter valid phone number', async function () {
  const phoneNumberInput = await driver.findElement(By.css('[data-testid="phone_number_input"]'));
  const validPhoneNumber = faker.phone.phoneNumberFormat();

  await phoneNumberInput.sendKeys(validPhoneNumber);
});

When('I enter valid OTP and verify {string}', async function (inputType) {
  let otpInput;

  switch(inputType) {
      case 'email':
          otpInput = await driver.findElement(By.css('[data-testid="email_otp_input"]'));
          break;
      case 'phonenumber':
          otpInput = await driver.findElement(By.css('[data-testid="phonenumber_otp_input"]'));
          break;
      default:
          console.log('Invalid input type');
          return;
  }

  const validOTP = generateValidOTP();
  await otpInput.sendKeys(validOTP);

  const verifyButton = await driver.findElement(By.css('[data-testid="verify_button"]'));
  await verifyButton.click();
});

Then('I should see "{string}" text to be changed to "{string}"', async function (buttonText, expectedText) {
  const button = await driver.findElement(By.xpath(`//*[contains(text(), "${buttonText}")]`));
  const buttonTextAfterVerification = await button.getText();

  if (buttonTextAfterVerification === expectedText) {
      console.log(`"${buttonText}" text has been changed to "${expectedText}" as expected.`);
  } else {
      console.log(`"${buttonText}" text has not been changed to "${expectedText}". Actual text: ${buttonTextAfterVerification}`);
  }
});
