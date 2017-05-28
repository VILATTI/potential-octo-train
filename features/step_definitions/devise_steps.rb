Given(/^User$/) do
  @user = create :user
end

Given(/^Performer$/) do
  @performer = create :user
end

Given(/^Logged in user$/) do
  step 'User'
  login_as @user
end

Given(/^Logged in performer$/) do
  step 'User'
  login_as @performer
end

Given(/^Visit root page$/) do
  visit root_path
end

When(/^I log out from system$/) do
  click_link 'Logout'
end

When(/^I fill in login form$/) do
  fill_in 'user_email', with: @user.email
  fill_in 'user_password', with: @user.password
end

And(/^I should see login form$/) do
  expect(page).to have_css 'form#new_user'
end

And(/^I submit form$/) do
  find('button[type=submit]').click
end

Then(/^I should see main app page$/) do
  expect(page).to have_css 'nav.navbar-default'
  expect(page).to have_css '.container'
end
