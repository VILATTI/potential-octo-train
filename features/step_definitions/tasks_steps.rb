Given(/^Tasks "(.*?)" as performer$/) do |arg|
  @tasks = create_list :task, arg.to_i, performer: @user
end

And(/^I should see task data$/) do
  within first('table.tasks-list-table tbody tr') do
    expect(page).to have_content @task.description
    expect(page).to have_content @task.state
    expect(page).to have_content @task.owner.email
    expect(page).to have_content @task.performer.email
    expect(page).to have_content @task.created_at.strftime('%a %b %d %Y')
  end
end

And(/^I sort tasks list by "(.*?)"$/) do |arg|
  within 'table.tasks-list-table' do
    click_link arg
  end
end

Then(/^I should see tasks list$/) do
  @task = @tasks.first
  step 'I should see task data'
end

Then(/^I should see sorted tasks list$/) do
  @task = @tasks.last
  step 'I should see task data'
end

And(/^I click create task button$/) do
  click_button 'Create task'
end

And(/^I fill create task form$/) do
  @task_attributes = attributes_for :task
  fill_in 'description', with: @task_attributes[:description]
end

And(/^I submit create task form$/) do
  click_button 'Create'
  wait_for_ajax
end

Then(/^I should see created task$/) do
  within '.tasks-list-table' do
    expect(page).to have_content @task_attributes[:description]
    expect(page).to have_content @task_attributes[:state]
    expect(page).to have_content @user.email
    expect(page).to have_content @performer.email
  end
end
