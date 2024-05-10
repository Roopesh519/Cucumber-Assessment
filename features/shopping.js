const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");


let driver = new Builder().forBrowser("chrome").build();


Given("I am in {string}", async function (page) {
  switch (page) {
    case "homepage":
      // ## localhost:3000/
      await driver.get("localhost:3000");
      break;


    case "product detail page":
      await driver.get("localhost:3000/product-detail-page/2333114566");
      global.productName = await driver.wait(until.elementLocated(By.css(`[data-testid='product-name']`))).getText();
      break;


    case "product list page":
      await driver.get("localhost:3000/product-list-page");
      break;


    case "my cart page":
      await driver.get("localhost:3000/my-cart");
      break;
  }
});


When("I searched for product as {string}", async function (product) {
  await driver.wait(until.elementIsVisible(By.css(`[data-testid="search-bar"]`))).sendKeys(product, Key.ENTER);
});


When("I click on the add to cart", async function () {
  await driver.wait(until.elementLocated(By.css(`[data-testid='add-to-cart']`))).click();
  let cartCards = await driver.wait(until.elementsLocated(By.css(`[data-testid="product-name"]`)));
  for(let card of cartCards){
    global.items_added_to_cart.push(await card.getText());
  }
});


Then("I should see the list of {string}", async function (product) {  //laptop
  // global.productNameElements = await driver.wait(until.elementsLocated(By.css(`[data-testid="product-name"]`)));
  global.productCategoryElements = await driver.wait(until.elementsLocated(By.css(`[data-testid="product-category"]`)));
  // global.productSearchNames = [];
  global.categories = [];


  // let productSearchName = await global.productNameElements.getText();
  // let category = await productCategoryElements.getText();
 
  // global.categories.push(category);
  // global.productSearchNames.push(productSearchName);
 
  for(let element of productCategoryElements){
    await global.categories.push(await element.getText());
  }


  // assert(global.productSearchNames.includes(product));
  assert(global.items_added_to_cart.includes(product));
  assert(global.categories.includes(product));
});


Then("I should see a message stating that {string}", async function (message) {
  let tries = 50;
  while (tries > 0) {
    let page = await driver.getPageSource();
    let check = page.includes(message);
    assert(check);
    if (check) {
      return Passed;
    }
  }
});


Then("I should see the product added to my cart", async function () {
  // let cartProductName = await driver.wait(until.elementLocated(By.css(`[data-testid ='cart-product-name']`))).getText();
  // assert.strictEqual(cartProductName, productName);


  let cartProduct_Elements = await card.findElement(By.css(`[data-testid="product-name"]`))
  let cartProductName = await cartProduct_Elements.getText()
  global.cartProductNames.push(cartProductName)
  assert(global.cartProductNames).includes(global.productName)
});


When("I select products to sort by {string} price", async function (sortBy) {
  switch (sortBy) {
    case "Price: Low to High":
      await driver.wait(until.elementLocated(By.css(`[data-testid="ascending-option"]`))).click();
      break;
    case "Price: High to Low":
      await driver.wait(until.elementLocated(By.css(`[data-testid="descending-option"]`))).click();
      break;
  }
});


Then("I should see the list of products in {string} order",async function (order) {
    let prev = 0, 
    error = false;
    let val;
    // await driver.wait(until.elementLocated(By.css(`[data-testid='']`)))
    switch (order) {
      case "Price: Low to High":
        for (let i = 0; i < 10; i++) {
          val = await driver.wait(until.elementLocated(By.css(`[data-testid='price-of-item${i}']`))).getText();
          if (val < prev) {
            error = true;
            break;
          }
          prev = val;
        }
        break;
      case "descending":
        for (let i = 0; i < 10; i++) {val = await driver.wait(until.elementLocated(By.css(`[data-testid='price-of-item${i}']`))).getText();
          if (val > prev) {
            error = true;
            break;
          }
          prev = val;
        }
        break;
    }
  }
);


When("I click on view my cart option", async function () {
  await driver.wait(until.elementLocated(By.css(`[data-testid="my-cart"]`))).click();


  // global.productPrice = [];
  // global.productQuantity = [];

  //-------------------------------------------------------------------------------------------------------------------------------------
  // let productCards = await driver.wait(until.elementsLocated(By.css(`[data-testid="cards"]`))); //all card in the cart
  for (let card of global.items_added_to_cart) {
    let priceElement = await card.findElement(By.css(`[data-testid=product-price]`)); //price element
    let quantityElement = await card.findElement(By.css(`[data-testid="product-quantity"]`)); //quantity element


    global.productPrice.push(await priceElement.getText()); //actual price
    global.productQuantity.push(await quantityElement.getAttribute('value')); //actual quantity  //getAttribute
  }


});


Then("I should see the list of products in {string}", async function () {  //in my cart
  global.displayedProductElement = await driver.wait(until.elementsLocated(By.css(`[data-testid="product-name"]`)));
  let displayedProductNames = [];
  for(let element of global.displayedProductElement){
    displayedProductNames.push(await element.getText());
  }
 
  assert.deepEqual(global.cartProductNames, displayedProductNames);
});


Then("I should see the price of each product and its quantity in the cart",async function () {
  let displayedPrice = [];
  let displayedQuantity = [];


  let displayedPriceElement = await driver.findElements(By.css(`[data-testid="product-price"]`));
  let displayedQuantityElement = await cards.findElements(By.css(`[data-testid="product-quantity"]`));


  for(let element of displayedPriceElement){
    displayedPrice.push(await element.getText());  
  }
  for(let element of displayedQuantityElement){
    displayedQuantity.push(await element.getText());  
  }
 
  assert.deepEqual(displayedPrice, global.productPrice);
  assert.deepEqual(displayedQuantity, global.productQuantity);
});


Then("I should see the subtotat of all products in the cart",async function () {
    let subtotal = await driver
      .wait(until.elementLocated(By.css(`[data-testid="subtotal"]`)))
      .getText();
    let gst = await driver.wait(until.elementLocated(By.css(`[data-testid="gst"]`))).getText();
    let grandTotal = await driver.wait(until.elementLocated(By.css(`[data-testid="grandtotal"]`))).getText();


    let actual_subtotal = 0;
    for (let i = 0; i < productCards.length; i++) {
      actual_subtotal += Number(global.productPrice[i]) * global.productQuantity[i];
    }
    let agst = (actual_subtotal / 100) * 18; //gst
    let actual_grandTotal = gst + actual_subtotal
    assert.strictEqual(subtotal, actual_subtotal)
    assert.strictEqual(gst, agst)
    assert.strictEqual(grandTotal, actual_grandTotal)
    assert.strictEqual(
      totalPrice,
      subtotal,
      "Total price of products does not match the subtotal value"
    );
  }
);


When("I change quantity of product by clicking on {string}",async function (change_quantity) {
  let productElement = await driver.findElement(By.css(`[data-testid="item-card"]`))
  global.beforeChangeQuantity = await getCurrentProductQuantity();
  switch (change_quantity) {
      case "increase quantity":
        await productElement.findElement(By.css(`[data-testid="productQuantity-increase"]`)).click();
        break;
     
      case "decrease quantity":
        await productElement.findElement(By.css(`[data-testid="productQuantity-decrease"]`)).click();
        break;
  }


  global.afterChangeQuantity =await getCurrentProductQuantity();
     
  async function getCurrentProductQuantity(){
    let currentCountElement = await productElement.findElement(By.css(`[data-testid="item-quantity"]`));
    let currentQuantity = await currentCountElement.getAttribute('value');
    return currentQuantity;
   }
});


Then("I should see the {string} in quantity", function (change) {
  switch(change){
    case "increasing count":
      assert(global.beforeChangeQuantity < global.afterChangeQuantity)


    case "decreasing count":
      assert(global.beforeChangeQuantity > global.afterChangeQuantity)
 }  
});


When('I click on the delete cart product',async function () {
  this.beforeDeleteCount =await getCurrentProductCount();
  await driver.wait(until.elementLocated(By.css(`[data-testid="cart-product-delete"]`))).click();
  this.afterDeleteCount =await getCurrentProductCount();
 
  async function getCurrentProductCount(){
    let currentCountElement = await driver.wait(until.elementLocated(By.css(`[data-testid="product-count"]`)));
    let currentCount = await currentCountElement.getText();
    return currentCount;
  }
});


Then('I should see decrease in cart item quantity',async function () {
  assert(this.beforeDeleteCount > this.afterDeleteCount,"Cart item quantity did not decrease as expected")
});
