@javascript
Feature: Create task

  Scenario: User creates task
    Given Logged in user
    Given Performer
    When  Visit root page
    And   I click create task button
    And   I fill create task form
    And   I submit create task form
    Given Run received websocket "add" function
    Then  I should see created task
