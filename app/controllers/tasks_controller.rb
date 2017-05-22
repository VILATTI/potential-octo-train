class TasksController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  # def index
  #   respond_to do |format|
  #     format.json { render json: { tasks: tasks_list, sort_type: params[:order_type] } }
  #   end
  # end

  def create
    task = Task.create(task_params.merge(owner_id: current_user.id))
    respond_to do |format|
      format.json { render json: TaskSerializer.new(task, {}).to_json }
    end
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)

    respond_to do |format|
      format.json { render json: TaskSerializer.new(task, {}).to_json }
    end
  end

  def destroy
    Task.find(params[:id]).destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # def tasks_list
  #   # .order("#{params[:order_by]} #{params[:order_type]}")
  #   current_user.tasks
  #     .map { |task| TaskSerializer.new(task, {}).serializable_hash }
  #     .sort_by { |task| task[:order_by] }
  # end

  def task_params
    params.require(:task).permit(:description, :state, :performer_id)
  end
end
