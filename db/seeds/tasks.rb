owner = User.find_by(email: 'user@mail.com')
performer = User.find_by(email: 'performer@mail.com')

(1..5).each do |i|
  task = Task.new(owner: owner, performer: performer, description: "test task ##{i}")
  task.save!
end
