Feature: Log in

  Scenario: User successfuly login
    Given User
    Given Visit root page
    And   I should see login form
    When  I fill in login form
    And   I submit form
    Then  I should see main app page
