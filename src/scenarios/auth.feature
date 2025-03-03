Feature: Authentication
  # I want to be able to log in to the application
  # So that I can access my dashboard

  @smoke @auth
  Scenario: Login successfully with valid credentials
    Given I am on the login page
    When I enter "test@example.com" as email
      And I enter "password123" as password
      And I click the login button
    Then I should be redirected to the dashboard
      

  @auth @negative
  Scenario: Login fails with invalid credentials
    Given I am on the login page
    When I enter "invalid@example.com" as email
      And I enter "wrongpassword" as password
      And I click the login button
    Then I should see an error message
      And I should remain on the login page 