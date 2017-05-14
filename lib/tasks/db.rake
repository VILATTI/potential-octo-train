require 'colorize'

namespace :db do
  namespace :seed do
    task user: :environment do
      load Rails.application.root.join('db', 'seeds', 'user.rb')
    end

    task performer: :environment do
      load Rails.application.root.join('db', 'seeds', 'performer.rb')
    end

    task tasks: :environment do
      load Rails.application.root.join('db', 'seeds', 'tasks.rb')
    end
  end
end
