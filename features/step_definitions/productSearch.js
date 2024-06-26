const assert = require('assert'); 
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, Key, Builder, until, Select} = require('selenium-webdriver')
const assert = require('assert');
const faker  = require('faker');

const axios = require('axios');
const { error } = require('console');

let product_detail;

Before('@get_product_detais', async function(productName){

    let response = await axios.get(`https://amazon.in/${productName}`, {
        params: {
            product_name: 'asus tuf a15',
        }
    });
    global.product_detail = response.data.product_name;
});


Given('I am on home page', async function () {
    await driver.get('https://www.amazon.in/home');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Home"]')));
});


When('I enter a product name as {string} into the search bar', async function (productName) {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')))
    await driver.wait(until.elementIsVisible(element))
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    element.sendKeys(productName);
    this.productName = productName;
});


Then('I should see a list of products that match the search query', async function () {
  
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(this.productName); 
        if (check) {
              passed
        }
      }
      throw new Error('The search query did not match any products');
});


When('I click on {string} button', async function (button) {
          let buttonElement;
          switch(button) {
              case 'Filter':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="filter"]')));
                  break;
              case 'apply_filter':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="apply_filter"]')));
                  break;
              case 'add_to_cart':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="add_to_cart"]')));
                  break;
              case 'delete_all_product':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="delete_all_product"]')));
                  break;
              case 'go_to_shopping':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="go_to_shopping"]')));
                  break;
              case 'view_my_wish_list':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="view_my_wish_list"]')));
                  break;
              case 'add_to_wish_list':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="add_to_wish_list"]')));
                  break;
                // changes completed
              default:
                  console.log('Invalid button string');
                  return; 
          }
          await buttonElement.click();
});


When('I search with empty field'), async function(){
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')));
    await driver.wait(until.elementIsVisible(element))
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    element.sendKeys(Key.ENTER);
}


When('I select the price as {int} - {int}', async function(lessThan, greaterThan) {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="price_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath("//option[. = '10000 - 20000']")).click();
  this.price = ['10000', '20000']; // Store price as a range
});


When('I select the brand as asus', async function() {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="brand_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath("//option[. = 'asus']")).click();
  this.brand = 'asus';
});


When('I select the screen-size as {int} inches', async function(inches) {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="screensize_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath(`//option[. = '${inches} inches']`)).click();
  this.screensize = `${inches} inches`;  
});


When('I select the processor as intel i5', async function() {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="processor_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath("//option[. = 'intel i5']")).click();
  this.processor = 'intel i5';
});


Then('I should see the products with filters applied', async function(){
  let products = await driver.wait(until.elementLocated(By.css('[data-testid="search-results"]')));

  for(let product of products) {
      let price = await product.findElement(By.css('[data-testid="price"]')).getText();
      let brand = await product.findElement(By.css('[data-testid="brand"]')).getText();
      let screenSize = await product.findElement(By.css('[data-testid="screen_size"]')).getText();
      let processor = await product.findElement(By.css('[data-testid="processor"]')).getText();
      let priceNumber = parseFloat(price.replace(/[^0-9.-]+/g,""));
      assert(priceNumber >= parseFloat(this.price[0]) && priceNumber <= parseFloat(this.price[1]), 'Price is not within the selected range');
      assert.equal(brand, this.brand);
      assert.equal(screenSize, this.screensize);
      assert.equal(processor, this.processor);
  }
});


Then('I should see a message {string}', async function (message) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(message); 
        if (check) {
              return 'passed' 
        }
      }
});


When('I click on a first product from results', async function (){
  // changes made
  let productName1 = await driver.wait(until.elementLocated(By.css('[data-testid="productName1"]'))).getText();
  let productPrice1 = await driver.wait(until.elementLocated(By.css('[data-testid="productPrice1"]'))).getText();
  let productDes1 = await driver.wait(until.elementLocated(By.css('[data-testid="productDes1"]'))).getText();
  this.productName1 = productName1;
  this.productPrice1 = productPrice1;
  this.productDes1 = productDes1;      
  await driver.wait(until.elementLocated(By.css('[data-testid="search-results_1"]'))).click();
});


Then('I should see the product details', async function () {
  // changes made on assertion
  let productName1 = await driver.wait(until.elementLocated(By.css('[data-testid="productName1"]'))).getText();
  let productPrice1 = await driver.wait(until.elementLocated(By.css('[data-testid="productPrice1"]'))).getText();
  let productDes1 = await driver.wait(until.elementLocated(By.css('[data-testid="productDes1"]'))).getText();
  assert.strictEqual(this.productName1, productName1, `Expected product name to be ${this.productName1} but found ${productName1}`);
  assert.strictEqual(this.productPrice1, productPrice1, `Expected product price to be ${this.productPrice1} but found ${productPrice1}`);
  assert.strictEqual(this.productDes1, productDes1, `Expected product description to be ${this.productDes1} but found ${productDes1}`);

  let productDetails = await driver.wait(until.elementLocated(By.css('[data-testid="product-details"]')));
  let isVisible = await productDetails.isDisplayed();
  if (isVisible) {
      console.log('Product details are visible.');
  } else {
      console.log('Product details are not visible.');
  }
});


Given('I am on the view cart page', async function () {
  await driver.get('https://www.amazon.in/gp/cart/view.html');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Shopping Cart"]')));
  let subtotalText = await driver.wait(until.elementLocated(By.id('total-items'))).getText();
  global.initialTotalItems = Number(subtotalText);

  // ----
});


When('I navigate to the view cart page', async function () {
  await driver.get('https://www.amazon.in/gp/cart/view.html');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Shopping Cart"]')));
});


// changes made
When('I calculate the sum of the prices of all items in the cart', async function () {
  let priceElements = await driver.wait(until.elementsLocated(By.css('[data-testid="item_subtotal"]')));
  this.totalCalculatedSum = 0;

  await Promise.all(priceElements.map(async (priceElement) => {
    let priceText = await priceElement.getText().trim();
    if (priceText === '') {
        throw new Error('Price element is empty');
    }
    let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    this.totalCalculatedSum += price;
}));
});


Then('the displayed subtotal should match the calculated sum', async function () {
  let subtotalElement = await driver.wait(until.elementLocated(By.css('[data-testid="subtotal"]')));
  let subtotalText = await subtotalElement.getText();
  let subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
  assert.strictEqual(subtotal, this.totalCalculatedSum, `The displayed subtotal (${subtotal}) does not match the calculated sum of item prices (${totalCalculatedSum}).`);
});


Then('I should see the subtotal of all items', async function () {
  let subtotalElement = await driver.wait(until.elementsLocated(By.css('[data-testid="item_subtotal"]')));
  let subtotal = await subtotalElement.getText();
  console.log(`The subtotal is: ${subtotal}`);
});


When('I click on {string} button for item {string}', async function (itemName) {
  let deleteButton = await driver.wait(until.elementLocated(By.css(`[data-testid="delete_btn_${itemName}"]`)));
  await deleteButton.click();
});


Then('the total number of items should be decrease by one', async function () {
  let currentTotalItems = await driver.wait(until.elementLocated(By.id('total-items'))).getText();
  currentTotalItems = Number(currentTotalItems);
  assert.strictEqual(global.initialTotalItems - 1, currentTotalItems, 'The total number of items did not decrease by one');
  global.initialTotalItems = currentTotalItems;
});


Then('I should see quantity of {string} {string} by one', async function (status) {
  let currentItemQuantity = await driver.wait(until.elementLocated(By.id(`${item}_quantity`))).getText();
  currentItemQuantity = Number(currentItemQuantity);
  switch (status) {
    case 'increase':
      assert.strictEqual(initialTotalItems + 1, currentItemQuantity, 'The total number of items did not increase by one');
      break;
    case 'decrease':
      assert.strictEqual(initialTotalItems - 1, currentItemQuantity, 'The total number of items did not decrease by one');
      break;
    default:
      throw new Error(`Invalid status: ${status}. Expected 'increase' or 'decrease'.`);
  }
  initialTotalItems = currentTotalItems;
});


When('I click on the {string} button of item {string}', async function (buttonName, itemName) {

  let button = await driver.wait(until.elementLocated(By.css(`${itemName}_${buttonName}`)));
  await button.click();
});


When('I click on {string} button for the first product', async function (addToCart1) {
  for (let loop = 100; loop > 0; loop--) {
    await driver.manage().setTimeouts({ pageLoad: 300 });
    let pageSource = await driver.getPageSource();
    let check = pageSource.includes(addToCart1);
    
    if (check) {
      let productNameElement = await driver.wait(until.elementLocated(By.css('[data-testid="productName1"]')));
      global.productName = await productNameElement.getText();
      await driver.wait(until.elementLocated(By.css('[data-testid="addToCart1"]'))).click();
  }
  }
});


Then('I should see recently added product in the cart', async function () {
    let pageSource = await driver.getPageSource();
    assert(pageSource.includes(global.productName), `The product name ${global.productName} is not found in the cart.`);
});


global.selectedItemsPrices = [];

When('I select the checkbox of specific items {string}', async function (selectedItems) {
    let items = selectedItems.split(',');

    for (let item of items) {
        let checkbox = await driver.driver.wait(until.elementLocated(By.css(`[data-testid="${item.trim()}_checkbox"]`)));
        await checkbox.click();
        let priceElement = await driver.driver.wait(until.elementLocated(By.css(`[data-testid="${item.trim()}_price"]`)));
        let priceText = await priceElement.getText();
        let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        global.selectedItemsPrices.push(price);
    }
});

//
Then('I should see the subtotal of only the selected items', async function () {
    let expectedSubtotal = global.selectedItemsPrices.reduce((a, b) => a + b, 0);
    let subtotalElement = await driver.wait(until.elementLocated(By.css('subtotal')));
    let subtotalText = await subtotalElement.getText();
    let subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
    assert.strictEqual(subtotal, expectedSubtotal, `The displayed subtotal (${subtotal}) does not match the expected subtotal of item prices (${expectedSubtotal}).`);
});


Given('I am on the product details page of {string}', async function (productName) {
  await driver.get(global.product_detail);
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="${productName}"]`)));
});


Given('the product {string} is out of stock', async function (productName) {
  let productStatus = await driver.wait(until.elementLocated(By.id('product-status')));
  let statusText = await productStatus.getText();

  if (statusText === 'Out of stock') {
      return 'passed'
  }
});


When('I click on {string} for an out of stock product', async function (addToCart) {
  let addToCart = await driver.wait(until.elementLocated(By.id('addToCart'))).click();
});


When('I try to remove a product from an empty cart', async function (){
  let deleteAllButton = await driver.wait(until.elementLocated(By.css(`[data-testid="delete-all_btn"]`)));
  await deleteAllButton.click();
}) 


Then('I should be redirected to sign in page', async function(){
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Sign In"]`)));
});


Given('I am not signed in', async function(){
  const signInTextElement = await driver.wait(until.elementLocated(By.id('sign-in')));
  const actualText = await signInTextElement.getText();
  assert.strictEqual(actualText, 'Sign In', `The user is not logged in`);
});


When('I click to add a product to wish list', async function(){
  await driver.wait(until.elementLocated(By.css('[data-testid="add-to-my-wish-list"]'))).click();
});


 Then('I should be re-directed to sign in', async function(){
  await driver.wait(until.urlContains('sign_in'));
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Sign In"]`)));
  // changes made on assert url contains
});


Given('the product is out of stock', async function(){
  this.productname = await driver.wait(until.elementLocated(By.css('[data-testid="product-name"]'))).getText();
  let status = await driver.wait(until.elementLocated(By.css('[data-testid="availability_of_productId"]'))).getText();
  assert.strictEqual(status, 'Out of Stock');
});


Then('I should see the product added to my wish list', async function(){
  await driver.wait(until.urlContains('my_wish_list'));
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Saved products"]`)));
 
  let wishList = await driver.wait(until.elementsLocated(By.css('[data-testid="wishlistproductNames"]')));
  let wishListNames = await Promise.all(wishList.map(item => item.getText()));
 
  if (wishListNames.includes(this.productname))
  return 'passed';
});
 

Then('I should be redirected to home page', async function(){
  await driver.wait(until.urlContains('home'));
  let homePageText = await driver.wait(until.elementLocated(By.xpath(`//*[text()="Welcome to Our Home Page"]`)));
  await driver.wait(until.elementIsVisible(homePageText));
});


When('I click on delete button for the first product', async function() {
  await driver.wait(until.elementLocated(By.css('[data-testid="dlt_product1"]'))).click();
});