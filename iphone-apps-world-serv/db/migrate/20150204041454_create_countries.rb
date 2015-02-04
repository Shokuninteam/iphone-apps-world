class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :label
      t.references :idStore, index: true

      t.timestamps null: false
    end
    add_foreign_key :countries, :idStores
  end
end
