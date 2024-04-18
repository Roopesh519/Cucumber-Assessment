Feature: Product Search and Add to cart
As user
I want to search for a product and add it to cart


    Scenario Outline: Search for a Product
        Given I am on a shopping site
        When I click on the search bar
        And I enter a product name as "<Product>" into the search bar
        Then I should see a list of products that match the search query
     
        Examples:
        | product      |
        | Laptop       |
        | Headphones   |
        | Smartphone   |
        | Camera       |

    Scenario Outline: Filtering search results by price range and additional criteria
    Given I am on a shopping site
    When I click on the search bar
    And I enter a product name as "<Product>" into the search bar
    And I click on the "Filter" button
    And I fill in the filter criteria with the following options:
        | Minimum Price: <MinPrice> | Maximum Price: <MaxPrice> | Brand: <Brand> | Screen Size: <ScreenSize> | Processor: <Processor> |
    Then I should receive a message "Filter Applied Successfully"

    Examples:
    | Product       | MinPrice | MaxPrice | Brand  | ScreenSize | Processor  |
    | iPhone        | 500      | 1000     | Apple  | 6.1        | A14 Bionic |
    | Samsung TV    | 400      | 800      | Samsung| 55 inches  |            |
    | Dell Laptop   | 600      | 1200     | Dell   |            | Intel i7   |




    Scenario: Viewing product details
        Given I am on a shopping site
        When I click on the search bar
        And I enter a product name as "laptop" into the search bar
        Then I should receive a message "Showing Results for laptop"
        When I click on a particular "laptop1"
        Then the product details for "laptop1" are displayed


    Scenario: Adding product to cart from Product details page
        Given I am on the product details page  
        When I click on "add to cart" button
        Then I receive a message "Product added to cart Successfully"
****
    
    Scenario: User performs an empty search
        Given I am on the shopping site
        When I click on the search bar
        And I search with empty field
        Then I should receive a message "Please enter a product name"
    

    Scenario:cart is empty
        Given I am on the View ceat page
        Then I should receive a message "cart empty"

    Scenario: Viewing added items in the cart
        Given I am on the View Cart page
        Then I should see the subtotal as "<subtotal>"

        Examples:
        | subtotal  |
        | 100.00    |
        | 250.00    |
        | 500.00    |
    Scenario Outline: Deleting items from the cart
        Given I am on the view_cart page
        When I click on "delete" button for item "<item>"
        Then I receive a message "Item removed successfully"

        Examples:
        | Item       |
        | laptop     | 
        | phone      | 
        | watch      | 
Scenario Outline: Updating item quantity in the cart
    Given I am on the view cart page
    When I click on the "<button>" button of item "<Item>" and enter "<quantity>"
    Then I should receive a message "Quantity updated successfully"

    Examples:
    | Item       | button             | quantity |
    | Laptop     | increase quantity  | 3        |
    | Smartphone | decrease quantity  | 1        |
    | Headphones | increase quantity  | 2        |



  Scenario: Adding new items to the cart
    Given I am on the view_cart page
    When I click on the search bar
    And enter the item name "phone"
    Then I receive a message "Showing result for Phone"
    When I click on a particular item "phone1"
    Then I see the details of the "phone1"
    When I click on the "add to cart" button
    Then I receive a message "Item added to cart successfully"




    Scenario Outline: Displaying Subtotal on View Cart Page
        Given I am on the view_cart page
        Then I should see Subtotal as "<Subtotal>"

        Examples:
        | Subtotal |
        | 2000     |
        | 3500     |
        | 1500     |
    

   Scenario Outline: Display subtotal for selected items in cart
        Given I am on the view_cart page
        Then I should see the subtotal of all items
        When I select the checkbox of specific items "<SelectedItems>"
        Then I should see the subtotal of only the selected items "<SubtotalSelectedItems>"

        Examples:
        | SelectedItems        | SubtotalSelectedItems |
        | "Laptop, Headphones" | 2500                  |
        | "Smartphone"         | 1000                  |
        | "Tablet, Speaker"    | 3500                  |


    Scenario Outline: Update quantity of specific items in the cart ***************8
        Given I am on the view_cart page
        And I see the list of items with their quantities
        When I update the quantity of specific item "<Item>" to "<Quantity>"
        Then I should receive a message "Cart updated successfully"

        Examples:
        | Item       | Quantity |
        | Laptop     | 2        |
        | Smartphone | 1        |
        | Headphones | 3        |


    Scenario Outline: Applying filters in the cart
        Given I am on the view_cart page
        When I apply filters "<filter_criteria>"
        Then I should see a message "filtered items list"

        Examples:
        | filter_criteria       |
        | price range           |
        | brand                 |
        | category              |
        | availability          |
        | rating                |
        | shipping options      |
        | promotional discounts |
