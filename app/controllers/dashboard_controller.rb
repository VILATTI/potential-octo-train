class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_store

  def index
    @tasks_data = { tasks: tasks, states: states, users: users, current_user_id: current_user.id }
  end

  private

  def initialize_store
    redux_store('TasksStore', props: { tasksData: { tasks: [] } })
  end

  def tasks
    ActiveModel::ArraySerializer.new(current_user.tasks, each_serializer: TaskSerializer).as_json
  end

  def states
    Task.state.values
  end

  def users
    ActiveModel::ArraySerializer.new(User.where.not(id: current_user.id), each_serializer: UserSerializer).as_json
  end
end
