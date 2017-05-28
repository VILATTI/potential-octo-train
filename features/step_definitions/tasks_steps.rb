Given(/^Tasks "(.*?)" as performer$/) do |arg|
  @tasks = create_list :task, arg.to_i, owner: @performer, performer: @user
end

Given(/^Tasks "(.*?)" as owner$/) do |arg|
  @tasks = create_list :task, arg.to_i, performer: @performer, owner: @user
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

Given(/^Run received websocket "(.*?)" function$/) do |arg|
  sleep 1
  count_result = arg == 'delete' ? 0 : 1
  expect(Task.count).to eq count_result
  task = arg == 'delete' ? @tasks.first : Task.last

  data =
    "{id:#{task.id}, description:'#{task.description}', state:'#{task.state}',
    created_at:'#{task.created_at}',
    owner_id:#{task.owner_id}, performer_id:#{task.performer_id},
    owner_email:'#{task.owner.email}', performer_email:'#{task.performer.email}'}"

  script = "App.tasks.received({task: #{data}, action: '#{arg}', taskId: #{task.id}})"
  page.execute_script(script)
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

And(/^I click update task button$/) do
  click_button 'Edit'
end

And(/^I fill update task form$/) do
  @updated_description = 'update description text'
  @updated_state = 'finished'
  fill_in 'description', with: @updated_description
  select @updated_state, from: 'formStateSelect'
end

And(/^I submit update task form$/) do
  click_button 'Update'
  wait_for_ajax
end

Then(/^I should see updated task$/) do
  within '.tasks-list-table' do
    expect(page).to have_content @updated_description
    expect(page).to have_content @updated_state
  end
end

And(/^I click delete task button$/) do
  click_button 'Delete'
  wait_for_ajax
end

Then(/^I should not see deleted task$/) do
  within 'table.tasks-list-table tbody' do
    expect(page).not_to have_content @tasks.first.description
    expect(page).not_to have_css 'tr'
  end
end

Then(/^I don't see delete task button$/) do
  expect(page).not_to have_css('button', text: 'Delete')
end
