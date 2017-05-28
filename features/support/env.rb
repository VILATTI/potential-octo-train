require 'factory_girl'
require 'cucumber/rails'
require 'webmock/cucumber' if Rails.env.test?
require 'cucumber/rspec/doubles'

include Warden::Test::Helpers

require 'sidekiq/testing/inline'
Sidekiq::Testing.fake!

Before do
  WebMock.disable_net_connect!(allow_localhost: true) if Rails.env.test?
end

Capybara.server_port = '8000'

Before('@javascript') do
  unless Capybara.current_driver == :selenium
    Capybara.current_session.driver.headers = { 'User-Agent' => 'Cucumber' }
  end
  @javascript_on = true
end

ActionController::Base.allow_rescue = false

begin
  DatabaseCleaner.strategy = :transaction
rescue NameError
  raise 'You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it.'
end

Cucumber::Rails::Database.javascript_strategy = :truncation
World(FactoryGirl::Syntax::Methods)
