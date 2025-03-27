Feature: Mobile App Login
  As a mobile user
  I want to be able to log in to the application
  So that I can access my account

  @android @mobile
  Scenario: Login on Android device
    Given I launch the mobile app
    When I tap on element with id "email_field"
    And I enter "test@example.com" into field with id "email_field"
    And I tap on element with id "password_field"
    And I enter "password123" into field with id "password_field"
    And I tap on element with id "login_button"
    Then I should see element with text "Welcome"

  @ios @mobile
  Scenario: Login on iOS device
    Given I launch the mobile app
    When I tap on element with id "email_field"
    And I enter "test@example.com" into field with id "email_field"
    And I tap on element with id "password_field"
    And I enter "password123" into field with id "password_field"
    And I tap on element with id "login_button"
    Then I should see iOS element with accessibility id "welcome_message" 