Feature: Product Search and Add to cart
As user
I want to search for a product and add it to cart


    Scenario Outline: Search for a Product
        Given I am on home page
        When I enter a product name as "<Product>" into the search bar
        Then I should see a list of products that match the search query

        Examples:
        | Product      |
        | Laptop       |
        | Headphones   |
        | Smartphone   |
        | Camera       |


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
        #changes required
        And I should see the products with filters applied
   
   
    Scenario: Viewing product details
        Given I am on home page
        When I enter a product name as "laptop" into the search bar
        Then I should see a message "Showing Results for laptop"
        When I click on a first product from results
        Then I should see the product details


    Scenario: User performs an empty search
        Given I am on home page
        When I search with empty field
        Then I should see a message "Please enter a product name"


    # Invalid product search

    Scenario: Search for a Product with No Results Found
        Given I am on home page
        When I enter a product name as "nonexistent_product" into the search bar
        Then I should see a message "No results found"


    Scenario: Cart is empty
        Given I am on the view cart page
        Then I should see a message "No products added yet into cart"


    Scenario: Adding new product to the cart from home page
        Given I am on home page
        When I enter a product name as "phone" into the search bar
        Then I should see a message "Showing result for Phone"
        When I click on "add_to_cart" button for the first product 
        Then I should see a message "Item added to cart successfully"


    
    Scenario: Verify the product added to cart from home page has been updated to cart 
        Given I am on the view cart page
        Then I should see recently added product in the cart


    @get_product_detais
    Scenario: Adding product to cart from Product details page
        Given I am on the product details page of "laptop"
        When I click on "add_to_cart" button
        Then I should see a message "Product added to cart Successfully"


    Scenario: Verify the product added to cart from product detail page has been updated to cart 
        Given I am on the view cart page
        Then I should see recently added product in the cart


    Scenario Outline: Updating item quantity in the cart
        Given I am on the view cart page
        When I click on the "<button>" button of item "<Item>"
        Then I should see the quantity of "<Item>" "<status>" by one

        Examples:
        | Item       | button | status   |
        | Laptop     | +      | increase |
        | Smartphone | -      | decrease |
        | Headphones | +      | increase |


    Scenario Outline: Deleting items from the cart
        Given I am on the view cart page
        When I click on "delete" button for item "<item>"
        Then I should see a message "Item removed successfully"
        And the total number of items should be decrease by one 

        Examples:
        | Item       |
        | laptop     |
        | phone      |
        | watch      |


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
        | SelectedItems        |
        | Laptop, Headphones   |
        | Smartphone           |
        | Tablet, Speaker      |


    # Product is out of stock
    
    @get_product_detais
    Scenario: Attempt to Add Out of Stock Product to Cart
        Given I am on the product details page of "laptop"
        When I click on "add_cart_button" for an out of stock product
        Then I should see a message "This product is currently out of stock"


    Scenario Outline: Attempt to Add More Items Than Available Stock to Cart
        Given I am on the product details page of "laptop"
        # And the available stock for the product "laptop" is "<available_stock>"
        And I have already added "<current_quantity>" of the product to the cart
        When I attempt to add "<additional_quantity>" more of the product to the cart
        Then I should see a message "The quantity limit for this product has been reached"

        Examples:
        | available_stock | current_quantity | additional_quantity |
        | 5               | 5                | 12                  |