class TasksController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    task = Task.create(task_params.merge(owner_id: current_user.id))
    respond_to do |format|
      format.json { render json: TaskSerializer.new(task, {}).to_json }
    end
  end

  def update
    # binding.pry
    # byebug
    task = Task.find(params[:id])
    p task_params
    task.update_attributes(task_params)
    p '1!!!!!'
    p task
    p '1!!!!!'
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

  def task_params
    params.require(:task).permit(:description, :state, :performer_id)
  end
end
