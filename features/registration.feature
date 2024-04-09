Feature: User Registration
As a new user
I want to be able to register for an account
So that I can access the application's features

#unhappy

  Scenario Outline: Register user with invalid or empty details 
    Given I am on the registration page
    When I enter my First name as "<first_name>"
    And I enter my Middle name as "<middle_name>"
    And I enter my Last name as "<last_name>"
    And I enter my username as "<username>"
    And I enter my email as "<email>"
    Then I click on "Submit" button 
    Then my details should be validated with "<message>"

  Examples:
  | first_name | middle_name | last_name | username | email            | message                                       |
  |            | Patel       | Singh     | user_283 | bharath@gmail.com| First name required /Invalid                  |  #first name
  | priya      |             | Sharma    |          | abc@example.com  | middle name required /Invalid                 |  #middle name
  | Siddharth  | Kumar       |           | user_123 | xyz@example.com  | Last name required /Invalid                   |	#last name
  |            |             |           | user_456 | def@example.com  | First,Middle,Last name Required /Invalid data |	#f,m,l name
  |            |             |           |          |                  | Fields empty                                  |	#Empty fields
  |            |             | Patel     | user_g12 | mno@example.com  | First and Middle name is Required / Invalid   |	#f,m name
  |            | Sharma      |           | use_jk21 | stu@example.com  | First and Last name is Required / Invalid     |	#f,l name
  |  Arjun     |             |           | user_b12 | raj@example.com  | Middle and Last name is Required / Invalid    |	#m,l name
  |  Pooja     | Patel       | Singh     |          | raja@example.com | user name is Required / Invalid               | 	#user name 
  |  Pady      | Patel       | Singh     | user_123 |                  | mail is  Required / Invalid                   |	#email 
 

  Scenario: Validate phone number without entering basic details
    Given I am on the registration page
    When I enter my phone number starting with code +91 followed by a 10-digit number
    And I click on "verify_phone_number" button
    Then I should see a popup message saying "First, Middle and Last names are empty" 


  Scenario: Validate phone number with OTP 
    Given I am on the registration page
    When I enter valid first, middle, and last names
    And I enter my phone number starting with code +91 followed by a 10-digit number
    And I click on "verify_phone_number" button
    Then I should see a popup message saying "OTP sent successfully to phone number"
    And the option to resend OTP should be activated after 3 minutes 
    When I enter the 6-digit OTP for "phno" validation 
    And I click on "Verify_OTP" button
    And I should see the "verify_phone_number" button text updated to "verified"
    

  Scenario: Invalid OTP for phone number
    Given I am on the registration page
    When I enter valid first, middle, and last names
    And I enter my phone number starting with code +91 followed by a 10-digit number
    And I click on "verify_phone_number" button
    Then I should see a popup message saying "OTP sent successfully to phone number"
    And the option to resend OTP should be activated after 3 minutes 
    When I enter the invalid 6-digit OTP for "phno" validation
    And I click on "Verify_OTP" button
    Then I should see a popup message saying "Invalid OTP"
    

  Scenario: Validate email address without entering basic details
    Given I am on the registration page
    When I enter my phone number starting with code +91 followed by a 10-digit number
    And I click on "verify_phone_number" button
    Then I should see a popup message saying "First, Middle and Last names are empty" 
    
    
  Scenario: Validate email address with OTP
    Given I am on the registration page
    When I enter valid first, middle, and last names
    And I enter a valid email address
    And I click on "Verify_Email" button
    Then I should see a popup message saying "OTP sent successfully to email address"
    And the option to resend OTP should be activated after 3 minutes

    When I enter the 6-digit OTP for "email" validation 
    And I click on "Verify_OTP" button
    Then I should see the "Verify Email" button text updated to "verified"


  Scenario: Invalid OTP for email
    Given I am on the registration page
    When I enter valid first, middle and last names
    And I enter a valid email address
    And I click on "Verify_Email" button
    Then I should see a popup message saying "OTP sent successfully to email address"
    And the option to resend OTP should be activated after 3 minutes
    
    When I enter the invalid 6-digit OTP for "email" validation
    And I click on "Verify_OTP" button
    Then I should see a popup message saying "Invalid OTP"


  Scenario: User registration with existing email 
    Given I am on the registration page
    When I enter already existing "Email"
    And I click on "Verify_Email" button
    Then I should see a popup message saying "Email Already Exists"

  Scenario: User registration with existing phone Number  
    Given I am on the registration page
    When I enter already existing "Phone Number"
    And I click on "verify_phone number" button
    Then I should see a popup message saying "Phone Number Already Exists"
    
  Scenario: User registration with existing username  
    Given I am on the registration page
    When I enter already existing "Username"
    Then I should see a popup message saying "Username Already Exists"

 #happy---------------------------------------
 
 Scenario: User valid registration                 
    Given I am on the registration page
    When I enter my valid basic details
    And I enter valid email 
    And I enter valid phone number
    And I click on "Verify_Email" button
    And I enter valid OTP and verify "email"
    Then I should see the "Verify_email" button text updated to "Verified"
	
    When I click on "Verify_phone" button 
    And I enter valid OTP and verify "phone_number"
    Then I should see the "Verify_phone_number" button text updated to "Verified"
    And I click on "Register" button
    
    Then I should see a popup message saying "registersation successful"
    And I should see a popup message saying "Verification mail sent to registered email"




   