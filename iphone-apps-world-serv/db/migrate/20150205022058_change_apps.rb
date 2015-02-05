class ChangeApps < ActiveRecord::Migration
  def change
  	  	change_table :apps do |t|
  		t.remove :name
  		t.string :name
  		t.index :name, unique: true
  	end
  	
  	change_table :categories do |t|
  		t.remove :name
  		t.string :name
  		t.index :name, unique: true
  	end
  end
end
