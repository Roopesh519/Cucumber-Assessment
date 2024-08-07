Feature: Password reset
  As a user
  I want to be able to reset my password
  So that I can regain access to my account

  # unhappy

  Scenario Outline: Password reset with invalid email
    Given I am on the login screen
    When I click on "Forgot Password" buttonds
    And I enter my email as "<invalid_email>"
    And I click on "Reset Password" button
    Then I should see a message "Invalid Email Address"

    Examples:
      | invalid_email         |
      | email_without_at.com  |
      | email_with_spaces.com |

  Scenario: Password reset with registered email
    Given I am on the login screen
    When I click on "Forgot Password" button
    And I enter my email as "admin@gmail.com"
    And I click on "Reset Password" button
    Then I should see a message "reset email has been sent"

  @get_link
  Scenario Outline: Validate new password which does not meet criteria
    Given I am on the password reset screen
    When I enter my new password as "<new_password>"
    And I enter confirm password as "<confirm_new_password>"
    Then I should see an error message "<message>"

    Examples:
      | new_password  | confirm_new_password | message                                        |
      | Admin@123     | admin@1234           | password does not match                        |
      | Raj@1234      | Raja@1234            | password does not match                        |
      | Mahesh854     | Mahesh854            | password requires at least 1 special character |
      | @Rajkumar     | @Rajkumar            | Password requires at least 1 number            |
      | swasthik@345  | swasthik@345         | Password requires at least 1 uppercase letter  |
      | RAHUL@2002    | RAHUL@2002           | password requires at least 1 lowercase letter  |
      | Dev@987       | Dev@987              | password requires at least 8 characters        |
      | shreesha@6543 | shreesha@6543        | password should not exceed 12 characters       |

  Scenario: Validate new password with all criteria met
    Given I am on the password reset screen
    When I enter my new password as "Admin@123"
    And I enter confirm password as "Admin@123"
    Then I should see a message "Password updated successfully"

  Scenario Outline: Login with invalid credentials
    Given I am on the login screen
    When I enter my email as "<email>"
    And I enter my password as "<password>"
    And I click the "submit" button
    Then I should see a message "<message>"

    Examples:
      | email             | password    | message             |
      | admin@gmail.com   | admin@123   | Invalid credentials |
      | pratham@7edge.com | pratham@123 | Invalid credentials |
      | prathvi@7edge.com | prathvi@123 | Invalid credentials |
      | ram@yahoo.com     | ram@123     | Invalid credentials |
      |                   | ram@123     | required field      |
      | ram@yahoo.com     |             | required field      |
      |                   |             | required field      |

  # happy

  Scenario Outline: Login with new password
    Given I am on the login screen
    When I enter my email as "admin@gmail.com"
    And I enter my password as "Strong@2024"
    And I click on "submit" button
    Then I should see a message "Login successful"
