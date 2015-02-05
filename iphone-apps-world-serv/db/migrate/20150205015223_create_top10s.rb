class CreateTop10s < ActiveRecord::Migration
  def change
    create_table :top10s do |t|
      t.references :idApp, index: true
      t.integer :rank

      t.timestamps null: false
    end
    add_foreign_key :top10s, :idApps
  end
end
