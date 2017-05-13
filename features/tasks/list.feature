@javascript
Feature: Tasks list

  Scenario: Show tasks list
    Given Logged in user
    Given Tasks "2" as performer
    When  Visit root page
    Then  I should tasks list
