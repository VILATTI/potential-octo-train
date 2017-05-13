FactoryGirl.define do
  factory :task do
    sequence(:description) { |n| "test task #{n}" }

    owner { create :user }
    performer { create :user }
  end
end
