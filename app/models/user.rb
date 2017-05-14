class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :owned_tasks, class_name: 'Task', foreign_key: 'owner_id'
  has_many :performed_tasks, class_name: 'Task', foreign_key: 'performer_id'

  def tasks
    Task.where('owner_id = :id OR performer_id = :id', id: id)
  end
end
