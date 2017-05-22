class Task < ActiveRecord::Base
  extend Enumerize

  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :performer, class_name: 'User', foreign_key: 'performer_id'

  enumerize :state, in: %i[unstarted started finished], predicates: true
  after_initialize { self.state ||= :unstarted }

  validates :description, presence: true
  validates :owner_id, presence: true
  validates :performer_id, presence: true

  after_commit  :created, on: :create
  after_commit  :updated, on: :update
  before_commit :deleted, on: :destroy

  private

  def created
    TaskWorker.perform_async(serialized(self), 'add')
  end

  def updated
    TaskWorker.perform_async(serialized(reload), 'update')
  end

  def deleted
    TaskWorker.perform_async(serialized(self), 'delete')
  end

  def serialized(task)
    TaskSerializer.new(task).as_json
  end
end
