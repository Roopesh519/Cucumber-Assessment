Feature: Product Search and Add to cart
    As user
    I want to search for a product and add it to cart

    # Unhappy paths

    Scenario: User performs an empty search
        Given I am on home page
        When I search with empty field
        Then I should see a message "Please enter a product name"


    Scenario: Search for a Product with No Results Found
        Given I am on home page
        When I enter a product name as "nonexistent_product" into the search bar
        Then I should see a message "No results found"


    Scenario: Cart is empty and Removing product from empty cart
        Given I am on the view cart page
        Then I should see a message "No products added yet into cart"


    @get_product_details
    Scenario: Attempt to Add Out of Stock Product to Cart
        Given I am on the product details page of "laptop"
        When I click on "add_cart_button" for an out of stock product
        Then I should see a message "This product is currently out of stock"


    Scenario: Product is out of stock, add to wish list
        Given I am on the product details page of "laptop"
        And the product is out of stock
        When I click on "add_to_wish_list" button
        Then I should see a message "Product added to your wishlist"
        When I click on "view_my_wish_list" button
        Then I should see the product added to my wish list


    # Happy paths

    Scenario Outline: Search for a Product
        Given I am on home page
        When I enter a product name as "<Product>" into the search bar
        Then I should see a list of products that match the search query

        Examples:
            | Product    |
            | Laptop     |
            | Headphones |
            | Smartphone |
            | Camera     |


    Scenario: Filtering search results by price range and additional criteria
        Given I am on home page
        When I enter a product name as "laptop" into the search bar
        And I click on "Filter" button
        And I select the price as 10000 - 20000
        And I select the brand as asus
        And I select the screen-size as 15 inches
        And I select the processor as intel i5
        And I click on "apply_filter" button
        Then I should see a message "Filter Applied Successfully"
        And I should see the products with filters applied


    Scenario: Viewing product details
        Given I am on home page
        When I enter a product name as "laptop" into the search bar
        Then I should see a message "Showing Results for laptop"
        When I click on a product from results
        Then I should see the product details


    Scenario: Adding a product to wish list when not signed in
        Given I am on the product details page of "laptop"
        And I am not signed in
        When I click to add a product to wish list
        Then I should be redirected to sign in page


    Scenario: Adding new product to the cart from home page
        Given I am on home page
        When I enter a product name as "phone" into the search bar
        Then I should see a message "Showing result for Phone"
        When I click on "add_to_cart" button for the product
        Then I should see a message "Item added to cart successfully"
        When I navigate to the view cart page
        Then I should see recently added product in the cart


    @get_product_details
    Scenario: Adding product to cart from Product details page
        Given I am on the product details page of "laptop"
        When I click on "add_to_cart" button
        Then I should see a message "Product added to cart Successfully"


    Scenario: Verify the product added to cart from product detail page has been updated to cart
        Given I am on the view cart page
        Then I should see recently added product in the cart


    Scenario Outline: Updating item quantity in the cart
        Given I am on the view cart page
        When I "<status>" quantity of item
        Then I should see the quantity of item "<status>" by one

        Examples:
            | status   |
            | increase |
            | decrease |
            | increase |


    Scenario: Verifying Subtotal on View Cart Page
        Given I am on the view cart page
        And I should see the subtotal of all items
        When I calculate the sum of the prices of all items in the cart
        Then the displayed subtotal should match the calculated sum


    Scenario Outline: Display subtotal for selected items in cart
        Given I am on the view cart page
        Then I should see the subtotal of all items
        When I select the checkbox of specific items "<SelectedItems>"
        Then I should see the subtotal of only the selected items

        Examples:
            | SelectedItems      |
            | Laptop, Headphones |
            | Smartphone         |
            | Tablet, Speaker    |


    Scenario Outline: Deleting items from the cart
        Given I am on the view cart page
        When I click on delete button for the product
        Then I should see a message "Product deleted successfully"
        And the total number of items should be decrease by one


    Scenario: Removing all products from my cart
        Given I am on the view cart page
        When I click on "delete_all_product" button
        Then I should see a message "Your cart is empty, Nothing to purchase"
        When I click on "go_to_shopping" button
        Then I should be redirected to home page

    # http methods

    @create_product
    Scenario: Manage products
        Given I am on admin portal
        And I navigate to the product listing page
        When I search product using serial number
        Then product should be listed
        And the product details should be correct
        When I navigate to view using product_id
        Then the product details should match payload
        When I delete the product
        Then the product should be deleted successfully
