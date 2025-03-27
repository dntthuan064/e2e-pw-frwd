Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my account

  @web
  Scenario: Login successfully on web
    Given I am on the login page
    When I enter "test@example.com" as email
    And I enter "password123" as password
    And I click the login button
    Then I should be redirected to the dashboard

  @android @mobile
  Scenario: Login successfully on Android
    Given I am on the login page
    When I enter "test@example.com" as email
    And I enter "password123" as password
    And I click the login button
    Then I should be redirected to the dashboard

  @ios @mobile
  Scenario: Login successfully on iOS
    Given I am on the login page
    When I enter "test@example.com" as email
    And I enter "password123" as password
    And I click the login button
    Then I should be redirected to the dashboard 