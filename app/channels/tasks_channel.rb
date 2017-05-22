class TasksChannel < ApplicationCable::Channel
  def subscribe(data)
    stop_all_streams
    stream_from "performers:#{data['performer_id']}:tasks"
    stream_from "owners:#{data['performer_id']}:tasks"
  end

  def unsubscribe
    stop_all_streams
  end
end
