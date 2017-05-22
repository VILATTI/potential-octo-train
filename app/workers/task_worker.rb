class TaskWorker
  include Sidekiq::Worker

  def perform(task, action)
    ActionCable.server.broadcast "performers:#{task['performer_id']}:tasks",
                                 task: task, action: action, taskId: task['id']

    ActionCable.server.broadcast "owners:#{task['owner_id']}:tasks",
                                 task: task, action: action, taskId: task['id']
  end
end
