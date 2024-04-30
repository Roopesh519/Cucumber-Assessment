const assert = require('assert'); 
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

Given('I am on home page', async function () {
    await driver.get('https://www.amazon.in/');
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
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')))
    await driver.wait(until.elementIsVisible(element))
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    element.sendKeys(Key.ENTER);
}

// pending

When('I select the price as 10000 - 20000', async function() {
      let select = await driver.findElement(By.id('ID_OF_PRICE_DROPDOWN'));
      await driver.wait(until.elementIsVisible(select), 5000);
      await select.click();
      await driver.findElement(By.xpath("//option[. = '10000 - 20000']")).click();
});

When('I select the brand as asus', async function() {
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new Options().headless()).build();
  try {
      await driver.get('URL_OF_YOUR_PAGE');
      let select = await driver.findElement(By.id('ID_OF_BRAND_DROPDOWN'));
      await driver.wait(until.elementIsVisible(select), 5000);
      await select.click();
      await driver.findElement(By.xpath("//option[. = 'asus']")).click();
  } finally {
      await driver.quit();
  }
});

When('I select the screen-size as 15 inches', async function() {
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new Options().headless()).build();
  try {
      await driver.get('URL_OF_YOUR_PAGE');
      let select = await driver.findElement(By.id('ID_OF_SCREEN_SIZE_DROPDOWN'));
      await driver.wait(until.elementIsVisible(select), 5000);
      await select.click();
      await driver.findElement(By.xpath("//option[. = '15 inches']")).click();
  } finally {
      await driver.quit();
  }
});

When('I select the processor as intel i5', async function() {
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new Options().headless()).build();
  try {
      await driver.get('URL_OF_YOUR_PAGE');
      let select = await driver.findElement(By.id('ID_OF_PROCESSOR_DROPDOWN'));
      await driver.wait(until.elementIsVisible(select), 5000);
      await select.click();
      await driver.findElement(By.xpath("//option[. = 'intel i5']")).click();
  } finally {
      await driver.quit();
  }
});

When('I fill the filter as {string}', async function (filter) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(filter); 
        if (check) {

            if(pageSource.includes(price)){
              await driver.wait(until.elementLocated(By.css('[data-testid="price-checkbox-1"]'))).click();
            }

            else if(pageSource.includes(brand)){
              await driver.wait(until.elementLocated(By.css('[data-testid="brand-checkbox-2"]'))).click();
            } 

            else if(pageSource.includes(screenSize)){
              await driver.wait(until.elementLocated(By.css('[data-testid="screenSize-checkbox-3"]'))).click();
            }

            else if(pageSource.includes(processor)){
              await driver.wait(until.elementLocated(By.css('[data-testid="processor-checkbox-2"]'))).click();
            }

            else 

            console.log('filter not found');
        }
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

// changes
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


Then('I should see the product details', function (itemName) {

});


Then('I should see a message {string}', function (message) {

});


Given('I am on the view cart page', function () {

});


Then('I should see the subtotal', function (subtotal) {

});


When('I click on "delete" button for item {string}', function (itemName) {

});


When('I click on the {string} button of item {string}', function (buttonName, itemName) {

});


When('I enter quantity as {string}', function (quantity) {

});


Then('I see the details of the product', function (itemName) {

});


Then('I should see subtotal', function (subtotal) {

});


Then('I should see the subtotal of all items', function () {

});


When('I select the checkbox of specific items {string}', function (selectedItems) {

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
