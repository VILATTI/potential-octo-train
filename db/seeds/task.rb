user = User.find_by(email: 'user@mail.com')
task = Task.new(owner: user, description: 'test task')
task.save!
