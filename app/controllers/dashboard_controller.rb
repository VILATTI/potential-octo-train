class DashboardController < ApplicationController
  before_action :initialize_store

  def index
    @tasks_data = {
      tasks: ActiveModel::ArraySerializer.new(current_user.tasks, each_serializer: TaskSerializer).as_json
    }
  end

  private

  def initialize_store
    redux_store('TasksStore', props: { tasksData: { tasks: [] } })
  end
end
