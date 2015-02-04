class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string :name
      t.decimal :price
      t.text :description
      t.text :analysis
      t.text :pros
      t.text :cons
      t.references :idCategory, index: true

      t.timestamps null: false
    end
    add_foreign_key :apps, :idCategories
  end
end
