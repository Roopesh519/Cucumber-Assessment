Feature: Product Search and Add to cart
As user
I want to search for a product and add it to cart


    Scenario Outline: Search for a Product
        Given I am on a shopping site
        When I enter a product name as <Product> into the search bar
        Then I should see a list of products that match the search query
     
        Examples:
        | product      |
        | Laptop       |
        | Headphones   |
        | Smartphone   |
        | Camera       |


    Scenario Outline: Filtering search results by price range and additional criteria
        Given I am on a shopping site
        When I enter a product name as "laptop" into the search bar
        And I click on "Filter" button
        And I select the 1st checkbox of the "Price"
        And I select the 2nd checkbox of the "Brand"
        And I select the 3rd checkbox of the "ScreenSize"
        And I select the 4th checkbox of the "Processor"
        And I click on "apply_filter" button
        Then I should see a message "Filter Applied Successfully"


    Scenario: Viewing product details
        Given I am on a shopping site
        When I enter a product name as "laptop" into the search bar
        Then I should see a message "Showing Results for laptop"
        When I click on a particular item "laptop1"
        Then the product details for "laptop1" are displayed


    Scenario: Adding product to cart from Product details page
        Given I am on the product details page  
        When I click on "add_to_cart" button
        Then I should see a message "Product added to cart Successfully"

    
    Scenario: User performs an empty search
        Given I am on a shopping site
        When I search with empty field
        Then I should see a message "Please enter a product name"
    

    Scenario:cart is empty
        Given I am on the view cart page
        Then I should see a message "cart empty"


    Scenario: Viewing added items in the cart
        Given I am on the view Cart page
        Then I should see the subtotal as <subtotal>

        Examples:
        | subtotal  |
        | "100.00"  |
        | 250.00    |
        | 500.00    |


    Scenario Outline: Deleting items from the cart
        Given I am on the view cart page
        When I click on "delete" button for item "<item>"
        Then I should see a message "Item removed successfully"

        Examples:
        | Item       |
        | laptop     | 
        | phone      | 
        | watch      | 


    Scenario Outline: Updating item quantity in the cart
        Given I am on the view cart page
        When I click on the "<button>" button of item "<Item>" 
        And I enter quantity as "<quantity>"
        Then I should see a message "Quantity updated successfully"

        Examples:
        | Item       | button             | quantity |
        | Laptop     | increase quantity  | 3        |
        | Smartphone | decrease quantity  | 1        |
        | Headphones | increase quantity  | 2        |


    Scenario: Adding new items to the cart
        Given I am on the view cart page
        When I enter a product name as "phone" into the search bar
        Then I should see a message "Showing result for Phone"
        When I click on a particular item "phone1"
        Then I see the details of the "phone1"
        When I click on "add_to_cart" button
        Then I should see a message "Item added to cart successfully"


    Scenario Outline: Displaying Subtotal on View Cart Page
        Given I am on the view cart page
        Then I should see subtotal as "<Subtotal>"

        Examples:
        | Subtotal |
        | 2000     |
        | 3500     |
        | 1500     |
    

   Scenario Outline: Display subtotal for selected items in cart
        Given I am on the view cart page
        Then I should see the subtotal of all items
        When I select the checkbox of specific items "<SelectedItems>"
        Then I should see the subtotal of only the selected items "<SubtotalSelectedItems>"

        Examples:
        | SelectedItems        | SubtotalSelectedItems |
        | Laptop, Headphones   | 2500                  |
        | Smartphone           | 1000                  |
        | Tablet, Speaker      | 3500                  |


    # Invalid product search

    Scenario: Search for a Product with No Results Found
        Given I am on a shopping site
        When I enter a product name as "nonexistent_product" into the search bar
        Then I should see a message "No results found"


    # Product is out of stock 

    Scenario: Attempt to Add Out of Stock Product to Cart
        Given I am on the product details page
        And the product "out_of_stock_product" is out of stock
        When I click on "add_to_cart" button
        Then I should see a message "This product is currently out of stock"

    Scenario: Attempt to Add More Items Than Available Stock to Cart
        Given I am on the product details page
        And the available stock for the product "limited_stock_product" is "<available_stock>"
        And I have already added "<current_quantity>" of the product to the cart
        When I attempt to add "<additional_quantity>" more of the product to the cart
        Then I should see a message "The quantity limit for this product has been reached"

        Examples:
        | available_stock | current_quantity | additional_quantity |
        | 10              | 5                | 6                   |
