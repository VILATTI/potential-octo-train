class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :state, :created_at, :owner_id, :performer_id, :owner_email, :performer_email

  def owner_email
    object.owner.email
  end

  def performer_email
    object.performer.email
  end
end
