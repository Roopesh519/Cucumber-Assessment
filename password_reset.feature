Feature: Password reset
As a user
I want to be able to reset my password
So that I can regain access to my account


#unhappy

Scenario: Password reset with invalid email
    Given I am on the login screen
    When I click on "Forgot Password" button
    And I enter "<invalid_email>"
    And I click on "Reset Password" button
    Then I should receive "<error_message>"

    Examples:
      | invalid_email          | error_message         |
      | invalidemail@          | Invalid Email Address |
      | email_without_at.com   | Invalid Email Address |
      | email_with_spaces.com  | Invalid Email Address |
      | bharath.shet@7edge.com | "Email address does not exist"|

@get_link
Scenario Outline: Validate with new password which do not meet criteria 
    Given I am on the password reset screen
    When I enter new password as "<new_password>"
    And I enter cconfirm password as "<confirm_new_password>"
    Then I should receive "<message>"

    Examples:
    | new_password | confirm_new_password | message                                       | 
    | Admin@123    | admin@1234           | password does not match                       |
    | Raj@1234     | Raja@1234            | password does not match                       |
    | Mahesh854    | Mahesh854            | password requires atleast 1 special character |
    | @Rajkumar    | @Rajkumar            | Password requires atleast 1 number            |
    | swasthik@345 | swasthik@345         | Password requires atleast 1 uppercase letter  | 
    | RAHUL@2002   | RAHUL@2002           | password requires atleast 1 lowercase letter  |
    | Dev@987      | Dev@987              | password requires atleast 8 characters        |
    | shreesha@6543| shreesha@6543        | password should not exceed 12 character       | 


Scenario: Validate new password with all criteria met
    Given I am on the password reset screen
    When I enter "Admin@123"
    And I enter "Admin@123"
    Then I should receive "<Password updated successfully>"


# Scenario: Login with unregistered email
    
#     Given I am on the login screen
#     And I have reset my password
#     And I should receive "password reset successful"
    
#     When I enter "<invalid_email>"
#     And I enter "<valid_password>"
#     And I click the submit button
#     Then I should receive "<Email address not found>"
#     And I should receive "Unsuccessful login attempt"

#     Examples:
#       | invalid_email       | valid_password |
#       | rakshan@gmail.com   | Valid@123      |
#       | raj@gmail.com       | raj@123        | 
      
      

Scenario Outline: Login with invalid new password
    Given I am on the login screen
    When I enter "<email>"
    And I enter "<invalid_password>"
    And I click the submit button
    
    Then I should receive "<Incorrect password>"
    And I should receive "Unsuccessful login attempt"

    Examples:
      | email             | invalid_password | 
      | ram@yahoo.com     | Invalid@123      | 
      | pratham@7edge.com | WeakPassword     |
      | admin@gmail.com   | 12345678         | 


#happy

Scenario: Password reset with registered email
    Given I am on the login screen
    When I click on "Forgot Password"
    And I enter "<mail>"
    And I click on "Reset Password" link
    Then I should receive "<reset email has been sent>"
  
  
@get_link
Scenario: Validate new password with all criteria met
    Given I am on the password reset screen
    When I enter "<new_password>"
    And I enter "<confirm_new_password>"
    Then I should receive "<Password updated successfully>"


# Scenario Outline: Login with new password
#     Given I am on the login screen
#     And i should receive "password reset successful"
    
#     When I enter "<mail>"
#     And I enter "<password>"
#     And I click the submit button
#     Then I should receive "login successful"
