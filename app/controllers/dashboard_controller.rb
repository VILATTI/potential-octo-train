class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_store

  def index
    @tasks_data = { tasks: tasks, states: states, users: users, current_user_id: current_user.id, sort_type: 'asc' }
  end

  private

  def initialize_store
    redux_store('TasksStore', props: { tasksData: { tasks: [] } })
  end

  def tasks
    current_user.tasks.map { |task| TaskSerializer.new(task, {}).serializable_hash }
  end

  def states
    Task.state.values
  end

  def users
    User.where.not(id: current_user.id).map { |user| UserSerializer.new(user, {}).serializable_hash }
  end
end
