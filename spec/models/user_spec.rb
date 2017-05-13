require 'rails_helper'

describe User do
  describe 'Associations' do
    it { should have_many(:owned_tasks) }
    it { should have_many(:tasks) }
  end
end
