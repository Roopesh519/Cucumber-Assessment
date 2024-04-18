const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, until, actions, Key } = require("selenium-webdriver");
const { faker } = require('@faker-js/faker');
const assert = require('assert');
const { TIMEOUT } = require("dns");


let driver = new Builder().forBrowser("chrome").build();

AfterAll(async function(){
  await driver.sleep(500)
  await driver.quit()
});

Given("I am on registration page",async function () {
  await driver.get('https://demo.wpeverest.com/user-registration/bordered/');
});

When('I enter my first name as {string}',async function (firstname) {
  let firstName =  await driver.wait(until.elementLocated(By.id('user_login')))
  await driver.actions().sendKeys(firstName,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await firstName.sendKeys(firstname);
});

When("I enter last name as {string}",async function (lastname) {
  let lastName = await driver.wait(until.elementLocated(By.id('login_lastname'))) 
  await driver.actions().sendKeys(lastName,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await lastName.sendKeys(lastname);
});

When("I enter email as {string}",async function (mail) {

  let email =  await driver.wait(until.elementLocated(By.id('user_email')))
  await driver.actions().sendKeys(email,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await email.sendKeys(mail);
});

When("I enter password as {string}",async function (password) {
   let Password =  await driver.wait(until.elementLocated(By.id('user_pass')))
   await driver.actions().sendKeys(Password,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
   await Password.sendKeys(password);
});

When("I enter confirm password as {string}",async function (confirmpassword) {
    let confirmPassword =  driver.wait(until.elementLocated(By.id('user_confirm_password')))
    await driver.actions().sendKeys(confirmPassword,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
    await confirmPassword.sendKeys(confirmpassword);
});

Then("I should see a {string} message",async function () {

let page = await driver.getPageSource()
let check = page.includes("User successfully registered.")
assert.strictEqual(check,true)
if (check){
  return Passed
}
});


When("I enter my valid first name and last name",async function () {
  let validname = await driver.wait(until.elementLocated(By.id('user_login')))
  await driver.actions().sendKeys(validname,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await validname.sendKeys(faker.person.fullName());
});

When("I enter valid email",async function () {
  let f = "bharath.shet"
  let validmail = await driver.wait(until.elementLocated(By.id('user_email')))
  await driver.actions().sendKeys(validmail,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await validmail.sendKeys(f+faker.string.numeric(6)+"@7edge.com");
});

When("I enter valid password and confirm password",async function () {
  await driver.wait(until.elementLocated(By.id('user_pass'))).sendKeys("qWerty123_!?$%^");
  await driver.wait(until.elementLocated(By.id('user_confirm_password'))).sendKeys("qWerty123_!?$%^");
});


When('I click the {string} button',async function () {
  let pressbutton = await driver.wait(until.elementLocated(By.css(`[data-testid="submit_button"]`)))
  await driver.actions().sendKeys(pressbutton,Key.chord(Key.CONTROL,'a')).sendKeys(Key.BACK_SPACE).perform();
  await pressbutton.click();
});

Then("I should see a {string}",async function (message) {
  let check = false;
  let tries = 100;
  while(tries>0){
    await driver.manage().setTimeouts({pageLoad : 300});
    let a = await driver.getPageSource()
    check = a.includes(message)     
    if(check == true){
      return 'passed'
    }
    tries --
  }
});

Then("I should redirected to login page",async function () {
  let currenturl = await driver.getCurrentUrl()
  let loginUrl = "https://demo.wpeverest.com/user-registration/bordered/"
  assert.strictEqual(currenturl,loginUrl)
});