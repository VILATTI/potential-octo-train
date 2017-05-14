require 'rails_helper'

describe User do
  describe 'Associations' do
    it { should have_many(:owned_tasks) }
    it { should have_many(:performed_tasks) }
  end

  context 'Methods' do
    describe 'tasks' do
      before do
        @user = create :user
        create :task, owner: @user
        create :task, performer: @user
        create :task
      end

      it { expect(@user.tasks.count).to eq 2 }
    end
  end
end
