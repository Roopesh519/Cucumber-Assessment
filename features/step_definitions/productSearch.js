const assert = require('assert');
const { Before, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, Key, Builder, until, Select } = require('selenium-webdriver')
const { faker } = require('@faker-js/faker');

const axios = require('axios');
const { error } = require('console');

let product_detail;

Before('@get_product_detais', async function (productName) {

  let response = await axios.get(`https://localhost:3000/${productName}`, {
    params: {
      product_name: 'asus tuf a15',
    }
  });
  global.product_detail = response.data.product_name;
});


Given('I am on home page', async function () {
  await driver.get('https://localhost:3000/home');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Home"]')));
});


When('I enter a product name as {string} into the search bar', async function (productName) {
  let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')));
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
  switch (button) {
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
    case 'view_product':
      buttonElement = await driver.wait(until.elementLocated(By.css('[data-testid="view_product"]')));
      break;

    // changes completed
    default:
      console.log('Invalid button string');
      return;
  }
  await buttonElement.click();
});


When('I search with empty field', async function () {
  let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')));
  await driver.wait(until.elementIsVisible(element))
  await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  element.sendKeys(Key.ENTER);
});


When('I select the price as {int} - {int}', async function (lessThan, greaterThan) {
  let select = await driver.wait(until.elementLocated(By.css('[data-testid="price_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath(`//option[. = '${lessThan} - ${greaterThan}']`)).click();
  this.price = [`${lessThan}`, `${greaterThan}`]; // Store price as a range
});


When('I select the brand as asus', async function () {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="brand_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath("//option[. = 'asus']")).click();
  this.brand = 'asus';
});


When('I select the screen-size as {int} inches', async function (inches) {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="screensize_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath(`//option[. = '${inches} inches']`)).click();
  this.screensize = `${inches} inches`;
});


When('I select the processor as intel i5', async function () {
  let select = await driver.wait(untill.elementLocated(By.css('[data-testid="processor_dropdown"]')));
  await select.click();
  await driver.findElement(By.xpath("//option[. = 'intel i5']")).click();
  this.processor = 'intel i5';
});


Then('I should see the products with filters applied', async function () {
  let products = await driver.wait(until.elementLocated(By.css('[data-testid="search-results"]')));

  for (let product of products) {
    let price = await product.findElement(By.css('[data-testid="price"]')).getText();
    let brand = await product.findElement(By.css('[data-testid="brand"]')).getText();
    let screenSize = await product.findElement(By.css('[data-testid="screen_size"]')).getText();
    let processor = await product.findElement(By.css('[data-testid="processor"]')).getText();
    let priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));
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
    assert.ok(check, 'passed');
  }
});


When('I click on a product from results', async function () {
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
  await driver.get('https://localhost:3000/gp/cart/view.html');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Shopping Cart"]')));
  let subtotalText = await driver.wait(until.elementLocated(By.id('total-items'))).getText();
  global.initialTotalItems = Number(subtotalText);
});


When('I navigate to the view cart page', async function () {
  await driver.get('https://localhost:3000/gp/cart/view.html');
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
  await Promise.all(priceElements.map(async (priceElement) => {
    let priceText = await priceElement.getText().trim();
    if (priceText === '') {
      throw new Error('Price element is empty');
    }
    let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    this.totalCalculatedSum += price;
  }));
  // here
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


When('I {string} quantity of item', async function (status) {
  let button = await driver.wait(until.elementLocated(By.css(`product1_${status}`)));
  await button.click();
});


Then('I should see the quantity of item {string} by one', async function (status) {
  let currentItemQuantity = await driver.wait(until.elementLocated(By.id(`product1_quantity`))).getText();
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


When('I click on {string} button for the product', async function (addToCart1) {
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

  assert.ok(statusText !== 'Out of stock', 'Status is not "Out of stock"');
});


When('I click on {string} for an out of stock product', async function (addToCart) {
  await driver.wait(until.elementLocated(By.id('addToCart'))).click();
});


When('I try to remove a product from an empty cart', async function () {
  let deleteAllButton = await driver.wait(until.elementLocated(By.css(`[data-testid="delete-all_btn"]`)));
  await deleteAllButton.click();
})


Then('I should be redirected to sign in page', async function () {
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Sign In"]`)));
});


Given('I am not signed in', async function () {
  const signInTextElement = await driver.wait(until.elementLocated(By.id('sign-in')));
  const actualText = await signInTextElement.getText();
  assert.strictEqual(actualText, 'Sign In', `The user is not logged in`);
});


When('I click to add a product to wish list', async function () {
  await driver.wait(until.elementLocated(By.css('[data-testid="add-to-my-wish-list"]'))).click();
});


Then('I should be re-directed to sign in', async function () {
  await driver.wait(until.urlContains('sign_in'));
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Sign In"]`)));
  // changes made on assert url contains
});


Given('the product is out of stock', async function () {
  this.productname = await driver.wait(until.elementLocated(By.css('[data-testid="product-name"]'))).getText();
  let status = await driver.wait(until.elementLocated(By.css('[data-testid="availability_of_productId"]'))).getText();
  assert.strictEqual(status, 'Out of Stock');
});


Then('I should see the product added to my wish list', async function () {
  await driver.wait(until.urlContains('my_wish_list'));
  await driver.wait(until.elementLocated(By.xpath(`//*[text()="Saved products"]`)));

  let wishList = await driver.wait(until.elementsLocated(By.css('[data-testid="wishlistproductNames"]')));
  let wishListNames = await Promise.all(wishList.map(item => item.getText()));

  assert.ok(wishListNames.includes(this.productname))

});


Then('I should be redirected to home page', async function () {
  await driver.wait(until.urlContains('home'));
  let homePageText = await driver.wait(until.elementLocated(By.xpath(`//*[text()="Welcome to Our Home Page"]`)));
  await driver.wait(until.elementIsVisible(homePageText));
});


When('I click on delete button for the product', async function () {
  await driver.wait(until.elementLocated(By.css('[data-testid="dlt_product1"]'))).click();
});

let productId = [];

const apiUrl = 'https://api.example.com/admin/products';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'gy6rr5ddtsydr75667vgy8uhnh97'  //random access key
};


Before('@crete_product', async function () {
  global.productPayload = {
    name: "Sample Product",
    serialNumber: "12345",
    brand: "Sample Brand",
    price: 100.0,
    description: "Sample Description",
    instock: true,
    discount: 10
  };

  const response = await axios.post(apiUrl, global.productPayload, { headers });
  const data = response.data;

  assert.strictEqual(data.data.message, 'product created successfully');
  assert.strictEqual(data.data.success_status, true);

  global.productIds.push(data.data._id);

  if (response.data.success) {
    productId[0] = response.data.id;
  }
});


Given('I am on admin portal', async function () {
  await driver.get('https://localhost:3000/admin');
  assert.ok(global.productPayload);
});


Given('I navigate to the product listing page', async function () {
  await driver.get('https://localhost:3000/admin/product_lsiting');
  await new Promise(resolve => setTimeout(resolve, 500));
  await driver.wait(until.elementLocated(By.xpath('//*[text()="Product Listing"]')));
  try {
    const response = await axios.get(apiUrl, { headers });
    productList = response.data;
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
});


When('I search for the product by serial number or name', async function () {
  let element = await driver.wait(until.elementLocated(By.css('[data-testid="search_bar"]')))
  await driver.wait(until.elementIsVisible(element))
  await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  element.sendKeys(global.productPayload.serialNumber);
});

// confusing 
Then('I should see the product in the listing', async function () {
  const productListing = await driver.findElement(By.xpath(`//*[text()="${global.productPayload.serialNumber}"]`));
  assert.ok(await productListing.isDisplayed());
});


Then('the product details should be correct', async function () {
  const lastCreatedProductId = global.productIds[global.productIds.length - 1];
  const viewedProduct = productList.find(product => product._id === lastCreatedProductId);

  assert.strictEqual(viewedProduct.name, global.productPayload.name);
  assert.strictEqual(viewedProduct.price, global.productPayload.price);
  assert.strictEqual(viewedProduct.brand, global.productPayload.brand);
});


Then('the product details should match payload', async function () {
  let name = await product.findElement(By.css('[data-testid="name"]')).getText();
  let price = await product.findElement(By.css('[data-testid="price"]')).getText();
  let brand = await product.findElement(By.css('[data-testid="brand"]')).getText();

  assert.strictEqual(name, global.productPayload.name);
  assert.strictEqual(price, global.productPayload.price);
  assert.strictEqual(brand, global.productPayload.brand);
});


When('I delete the product', async function () {
  try {
    const lastCreatedProductId = global.productIds.pop();
    const deleteUrl = `${apiUrl}/${lastCreatedProductId}`;
    const response = await axios.delete(deleteUrl, { headers });
    const data = response.data;

    assert.strictEqual(data.success_status, true);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
});


Then('the product should be deleted successfully', async function () {
  try {
    const lastCreatedProductId = global.productIds[global.productIds.length - 1];
    const response = await axios.get(apiUrl, { headers });
    productList = response.data;

    const productExists = productList.some(product => product._id === lastCreatedProductId);
    assert.strictEqual(productExists, false, `Product with ID ${lastCreatedProductId} should not be present in the listing`);
  } catch (error) {
    console.error('Error verifying deletion:', error);
    throw error;
  }
});
