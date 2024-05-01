@afterAll
Feature: New UI Sign In
  Scenario: User authentication
    Given the user is on new sign-in page
    And the user fills email as "test@test.com" and password as "password"
    When the user clicks sign-in
    Then the user must be redirected to home page