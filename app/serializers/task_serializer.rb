class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :state, :created_at

  has_one :owner
  has_one :performer
end
