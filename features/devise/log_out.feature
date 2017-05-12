Feature: Log out

  Scenario: User successfuly logout
    Given Logged in user
    Given Visit root page
    When  I log out from system
    Then  I should see login form
