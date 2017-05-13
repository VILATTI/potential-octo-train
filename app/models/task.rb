class Task < ActiveRecord::Base
  extend Enumerize

  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :performer, class_name: 'User', foreign_key: 'performer_id'

  enumerize :state, in: %i(unstarted started finished), predicates: true
  after_initialize { self.state ||= :unstarted }

  validates :description, presence: true
end
