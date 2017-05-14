class CreateTask < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :owner_id
      t.integer :performer_id

      t.string :description
      t.string :state
      t.timestamps null: false
    end

    add_index :tasks, :owner_id
    add_index :tasks, :performer_id
  end
end
