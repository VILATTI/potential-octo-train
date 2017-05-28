@javascript
Feature: Update task

  Scenario: User can update task
    Given Logged in user
    Given Performer
    Given Tasks "1" as performer
    When  Visit root page
    And   I click update task button
    And   I fill update task form
    And   I submit update task form
    Given Run received websocket "update" function
    Then  I should see updated task
