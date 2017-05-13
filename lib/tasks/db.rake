require 'colorize'

namespace :db do
  namespace :seed do
    task user: :environment do
      load Rails.application.root.join('db', 'seeds', 'user.rb')
    end

    task task: :environment do
      load Rails.application.root.join('db', 'seeds', 'task.rb')
    end
  end
end
