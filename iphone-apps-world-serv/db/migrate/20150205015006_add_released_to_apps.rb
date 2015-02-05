class AddReleasedToApps < ActiveRecord::Migration
  def change
    add_column :apps, :released, :boolean
  end
end
