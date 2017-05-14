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
