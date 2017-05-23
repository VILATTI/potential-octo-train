require "capybara/rails"
require 'capybara/rspec'
# require "capybara/webkit"
require 'capybara/poltergeist'
require 'headless'

Dir[Rails.root.join('spec/acceptance/support/*.rb')].each { |f| require f }

Dir[Rails.root.join('spec/acceptance/shared_examples/**/*.rb')].each { |f| require f }
Dir[Rails.root.join('spec/react/helpers/**/*.rb')].each { |f| require f }
Dir[Rails.root.join('spec/react/shared_examples/**/*.rb')].each { |f| require f }

# This server should be for test which uses sockets
Capybara.register_server :thin do |app, port, host|
  require 'rack/handler/thin'
  Rack::Handler::Thin.run(app, Port: port, Host: host)
end

Capybara.server = :thin

# Capybara::Webkit.configure do |config|
#   config.block_unknown_urls
#   config.skip_image_loading
# end

Capybara.register_driver :poltergeist do |app|
  options = {
    debug: false,
    timeout: 30,
    window_size: [1920, 1080],
    js_errors: false,
    phantomjs_options: [
      '--load-images=no',
      '--proxy-type=none',
      '--ignore-ssl-errors=yes',
      '--ssl-protocol=any',
      '--web-security=false'
    ]
  }

  Capybara::Poltergeist::Driver.new(app, options)
end

Capybara.default_max_wait_time = 30
Capybara.javascript_driver = :poltergeist

RSpec.configure do |config|
  # config.default_retry_count = ENV['RETRY_COUNT'].try(:to_i) || 4
  # config.verbose_retry = true

  config.before(:each) do |example|
    if example.metadata[:js]
      # Capybara.server_port = ENV['PORT'].try(:to_i) || 3000
      set_capybara_locale(example.metadata[:locale] || I18n.default_locale)

      # Test are runned much faster with driver switching
      if example.metadata[:phantomjs]
        Capybara.javascript_driver = :poltergeist
        Capybara.current_driver = :poltergeist
      elsif example.metadata[:selenium] && !ENV['CI']
        Capybara.current_driver = :selenium
        Capybara.current_session.driver.browser.manage.window.resize_to(1920, 1080)
        Capybara.current_session.driver.browser.manage.timeouts.page_load = 300
      else
        if ENV['CI']
          headless = Headless.new
          headless.start
        end
        # Capybara.current_driver = :webkit
        # Capybara.javascript_driver = :webkit
        handle = Capybara.current_session.driver.current_window_handle
        Capybara.current_session.driver.resize_window_to(handle, 1920, 1080) if handle
      end
    end
  end

  config.before(:each, phantomjs: true) do
    page.driver.browser.url_blacklist = [
      "http://fonts.gstatic.com/",
      "http://maxcdn.bootstrapcdn.com/",
      "http://code.jquery.com/",
      "http://cdnjs.cloudflare.com/",
      "http://fonts.googleapis.com/"
    ]
  end

  config.after(:each, js: true) do |example|
    if page.driver.respond_to?(:clear_network_traffic)
      page.driver.clear_network_traffic
    end

    page.driver.restart if defined?(page.driver.restart)
    Capybara.use_default_driver
  end
end
