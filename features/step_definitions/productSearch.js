const assert = require('assert'); 
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const axios = require('axios');

let product_search;

Before(async function(){
    let response = await axios.get('https://amazon.in/laptop', {
        params: {
            email: "admin@gmail.com"
        }
    });

    product_search = response.data.link;
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
});


Then('I should see a list of products that match the search query', async function () {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(Results); 
        if (check) {
              return 'passed'
        }
      }
});


When('I click on {string} button', async function (button) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(button); 
        if (check) {
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

              default:
                  console.log('Invalid button string');
                  return; 
          }
          await buttonElement.click();
        }
    }
});

When('I search with empty field'), async function(){
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')));
    await driver.wait(until.elementIsVisible(element))
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    element.sendKeys(Key.ENTER);
}


When('I select the price as 10000 - 20000', async function() {
      let select = await driver.wait(untill.elementLocated(By.css('[data-testid="price_dropdown"]')));
      await select.click();
      await driver.findElement(By.xpath("//option[. = '10000 - 20000']")).click();
});


When('I select the brand as asus', async function() {
      let select = await driver.wait(untill.elementLocated(By.css('[data-testid="brand_dropdown"]')));
      await select.click();
      await driver.findElement(By.xpath("//option[. = 'asus']")).click();
});


When('I select the screen-size as 15 inches', async function() {
      let select = await driver.wait(untill.elementLocated(By.css('[data-testid="screensize_dropdown"]')));
      await select.click();
      await driver.findElement(By.xpath("//option[. = '15 inches']")).click();
});


When('I select the processor as intel i5', async function() {
      let select = await driver.wait(untill.elementLocated(By.css('[data-testid="processor_dropdown"]')));
      await select.click();
      await driver.findElement(By.xpath("//option[. = 'intel i5']")).click();
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


When('I click on a particular product from results', async function (){
    for (let loop = 100; loop > 0; loop--) {
      await driver.manage().setTimeouts({ pageLoad: 300 });
      let pageSource = await driver.getPageSource();
      let check = pageSource.includes(Results); 
      if (check) {
        await driver.wait(until.elementLocated(By.css('[data-testid="search-results_1"]'))).click();
      }
    }
});


Then('I should see the product details', async function () {
  let productDetails = await driver.wait(until.elementLocated(By.css('[data-testid="product-details"]')));
  let isVisible = await productDetails.isDisplayed();
  if (isVisible) {
      console.log('Product details are visible.');
  } else {
      console.log('Product details are not visible.');
  }
});


Given('I am on the view cart page', async function () {
  await driver.get('https://www.amazon.in/gp/cart/view.html?ref_=nav_cart');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Shopping Cart"]')));
});


When('I calculate the sum of the prices of all items in the cart', async function () {
  let priceElements = await driver.wait(until.elementLocated(By.css('[data-testid="item_price_selector"]')));
  totalCalculatedSum = 0;
  for (let priceElement of priceElements) {
      let priceText = await priceElement.getText();
      let price = parseFloat(priceText.replace(/[^0-9.]/g, "")); 
      totalCalculatedSum += price;
  }
});


Then('the displayed subtotal should match the calculated sum', async function () {
  let subtotalElement = await driver.findElement(By.css('SUBTOTAL_SELECTOR'));
  let subtotalText = await subtotalElement.getText();
  let subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, "")); 
  if (subtotal !== totalCalculatedSum) {
      throw new Error(`The displayed subtotal (${subtotal}) does not match the calculated sum of item prices (${totalCalculatedSum}).`);
  }
}); 


Then('I should see the subtotal', async function () {
  let subtotalElement = await driver.findElement(By.css('subtotal'));
  let subtotal = await subtotalElement.getText();
  console.log(`The subtotal is: ${subtotal}`);
});


When('I click on "delete" button for item {string}', async function (itemName) {
  let deleteButton = await driver.wait(until.elementLocated(By.css('delete_btn')));
  await deleteButton.click();
});


When('I click on the {string} button of item {string}', async function (buttonName, itemName) {
  let button = await driver.wait(until.elementLocated(By.css(`${itemName}_${buttonName}`)));
  await button.click();
});


When('I click on {string} button for a particular product ', async function (addToCart) {
  for (let loop = 100; loop > 0; loop--) {
    await driver.manage().setTimeouts({ pageLoad: 300 });
    let pageSource = await driver.getPageSource();
    let check = pageSource.includes(button); 
      if (check) {
        await driver.wait(until.elementLocated(By.css('[data-testid="addToCart"]'))).click();
      }
    }
});


Then('I see the details of the product', function (itemName) {

});


Then('I should see the subtotal of all items', function () {

});


Then('I should see the subtotal of only the selected items {string}', function (subtotalSelectedItems) {

});


Given('I am on the product details page', function () {

});


Given('the product {string} is out of stock', function (productName) {

});


Given('the available stock for the product {string} is {string}', function (productName, availableStock) {

});


Given('I have already added {string} of the product to the cart', function (currentQuantity) {

});


When('I attempt to add {string} more of the product to the cart', function (additionalQuantity) {

});
