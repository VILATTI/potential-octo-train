module WaitForAjax
  def wait_for_ajax
    Timeout.timeout(Capybara.default_max_wait_time) do
      loop until finished_all_ajax_requests?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active').zero?
  end

  def wait_animation
    wait_until do
      page.evaluate_script('$(":animated").length').zero?
    end
  end

  def wait_page_loading
    @javascript_on && wait_for_ajax && wait_animation
  end
end
World(WaitForAjax)
