FactoryGirl.define do
  factory :task do
    description 'test description'

    owner { create :user }
    performer { create :user }
  end
end
