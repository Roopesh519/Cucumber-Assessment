const assert = require('assert'); 
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

Given('I am on a shopping site', async function () {
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

When('I fill the filter as {string}', async function (filter) {
    for (let loop = 100; loop > 0; loop--) {
        await driver.manage().setTimeouts({ pageLoad: 300 });
        let pageSource = await driver.getPageSource();
        let check = pageSource.includes(filter); 
        if (check) {
          let buttonElement;
    
          switch(button) {
              case 'MinPrice':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="minPrice"]')));
                  break;
              case 'MaxPrice':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="maxPrice"]')));
                  break;
              case 'Brand':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="brand"]')));
                  break;
              case 'ScreenSize':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="ScreenSize"]')));
                  break;
              case 'Processor':
                  buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="processor"]')));
                  break; 

              default:
                  console.log('Invalid button string');
                  return; 
          }
          await buttonElement.click();
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


When('I click on a particular item {string}', function (itemName) {
    
});


Then('the product details for {string} are displayed', function (itemName) {
  // Verify that the details of the specified item are displayed
});

// Then I should see a message "No results found"
Then('I should see a message {string}', function (message) {
  // Verify that the message "No results found" is displayed
});

// Given I am on the View cart page
Given('I am on the view cart page', function () {
  // Navigate to the View cart page
});

// Then I should see the subtotal as <subtotal>
Then('I should see the subtotal as {string}', function (subtotal) {
  // Verify that the subtotal is displayed correctly
});

// When I click on "delete" button for item "<item>"
When('I click on "delete" button for item {string}', function (itemName) {
  // Click on the delete button for the specified item
});

// When I click on the "<button>" button of item "<Item>"
When('I click on the {string} button of item {string}', function (buttonName, itemName) {
  // Click on the specified button of the specified item
});

// When I enter quantity as "<quantity>"
When('I enter quantity as {string}', function (quantity) {
  // Enter the specified quantity
});

// Then I see the details of the "phone1"
Then('I see the details of the {string}', function (itemName) {
  // Verify that the details of the specified item are displayed
});

// Then I should see subtotal as "<Subtotal>"
Then('I should see subtotal as {string}', function (subtotal) {
  // Verify that the subtotal is displayed correctly
});

// Then I should see the subtotal of all items
Then('I should see the subtotal of all items', function () {
  // Verify that the subtotal of all items is displayed correctly
});

// When I select the checkbox of specific items "<SelectedItems>"
When('I select the checkbox of specific items {string}', function (selectedItems) {
  // Select the checkboxes of the specified items
});

// Then I should see the subtotal of only the selected items "<SubtotalSelectedItems>"
Then('I should see the subtotal of only the selected items {string}', function (subtotalSelectedItems) {
  // Verify that the subtotal of only the selected items is displayed correctly
});

// Given I am on the product details page
Given('I am on the product details page', function () {
  // Navigate to the product details page
});

// Given the product "out_of_stock_product" is out of stock
Given('the product {string} is out of stock', function (productName) {
  // Mark the specified product as out of stock
});

// Given the available stock for the product "limited_stock_product" is "<available_stock>"
Given('the available stock for the product {string} is {string}', function (productName, availableStock) {
  // Set the available stock for the specified product
});

// Given I have already added "<current_quantity>" of the product to the cart
Given('I have already added {string} of the product to the cart', function (currentQuantity) {
  // Add the specified quantity of the product to the cart
});

// When I attempt to add "<additional_quantity>" more of the product to the cart
When('I attempt to add {string} more of the product to the cart', function (additionalQuantity) {
  // Attempt to add the specified additional quantity of the product to the cart
});
