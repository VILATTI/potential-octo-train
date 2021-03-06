require 'rails_helper'

describe Task do
  describe 'Associations' do
    it { should belong_to(:owner) }
    it { should belong_to(:performer) }
  end

  describe 'Validations' do
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:owner_id) }
    it { should validate_presence_of(:performer_id) }
  end
end
