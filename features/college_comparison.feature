
Feature: College Comparison
  As a user
  I want to compare colleges
  So that I can make an informed decision

  Scenario: Compare two colleges successfully
    Given I am on the college comparison page
    When I enter "College A" in the first college search field
    And I enter "College B" in the second college search field
    And I click the "Compare" button
    Then I should see a comparison table displaying details for "College A" and "College B"
    And the comparison table should include "Placements", "Location", "Faculty Review", "Fees", "ROI", "Industry Value", "Brand Value", and "College Life"

  Scenario: Compare multiple colleges successfully
    Given I am on the college comparison page
    When I enter "College X" in the first college search field
    And I enter "College Y" in the second college search field
    And I add a new college search field
    And I enter "College Z" in the new college search field
    And I click the "Compare" button
    Then I should see a comparison table displaying details for "College X", "College Y", and "College Z"

  Scenario: Handle invalid college input
    Given I am on the college comparison page
    When I enter "Invalid College" in the first college search field
    And I click the "Compare" button
    Then I should see an error message "College 'Invalid College' not found."

  Scenario: Toggle dark/light mode
    Given I am on the college comparison page
    And the website is in "light" mode
    When I click the "Dark Mode Toggle" button
    Then the website should switch to "dark" mode
    And this preference should be carried to other pages
