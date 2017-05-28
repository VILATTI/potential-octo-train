@javascript
Feature: Delete task

  Scenario: Owner can delete task
    Given Logged in user
    Given Performer
    Given Tasks "1" as owner
    When  Visit root page
    And   I click delete task button
    Given Run received websocket "delete" function
    Then  I should not see deleted task

  Scenario: Member cant delete task
    Given Logged in user
    Given Performer
    Given Tasks "1" as performer
    When  Visit root page
    Then  I don't see delete task button
