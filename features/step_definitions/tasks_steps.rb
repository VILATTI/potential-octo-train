Given(/^Tasks "(.*?)" as performer$/) do |arg|
  @tasks = create_list :task, arg.to_i, performer: @user
end

Then(/^I should tasks list$/) do
  task = @tasks.first
  within 'table.tasks-list-table' do
    expect(page).to have_content task.description
    expect(page).to have_content task.state
    expect(page).to have_content task.owner.email
    expect(page).to have_content task.performer.email
    expect(page).to have_content task.created_at.strftime('%a %b %d %Y')
  end
end
