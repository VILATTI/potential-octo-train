@javascript
Feature: Tasks list

  Scenario: Sort tasks list
    Given Logged in user
    Given Performer
    Given Tasks "2" as owner
    When  Visit root page
    Then  I should see tasks list
    And   I sort tasks list by "Description"
    Then  I should see sorted tasks list
