require 'colorize'

namespace :db do
  namespace :seed do
    task user: :environment do
      load Rails.application.root.join('db', 'seeds', 'user.rb')
    end
  end
end
