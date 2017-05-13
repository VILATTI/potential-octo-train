class DashboardController < ApplicationController
  def index
    @tasks = { tasks: ActiveModel::ArraySerializer.new(current_user.tasks, each_serializer: TaskSerializer).as_json }
  end
end
