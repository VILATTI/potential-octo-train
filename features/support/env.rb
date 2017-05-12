require 'cucumber/rails'
require 'webmock/cucumber' if Rails.env.test?
require 'capybara/poltergeist'
require 'cucumber/rspec/doubles'

Before do
  WebMock.disable_net_connect!(allow_localhost: true) if Rails.env.test?
end

Capybara.server_port = '8000'
Capybara.app_host = 'http://localhost:8000'
if Rails.env.test?
  Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end
end

Capybara.javascript_driver = :poltergeist

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
