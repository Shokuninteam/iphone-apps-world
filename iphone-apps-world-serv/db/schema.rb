# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150205022058) do

  create_table "apps", force: :cascade do |t|
    t.decimal  "price"
    t.text     "description"
    t.text     "analysis"
    t.text     "pros"
    t.text     "cons"
    t.integer  "idCategory_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.boolean  "released"
    t.string   "name"
  end

  add_index "apps", ["idCategory_id"], name: "index_apps_on_idCategory_id"
  add_index "apps", ["name"], name: "index_apps_on_name", unique: true

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  add_index "categories", ["name"], name: "index_categories_on_name", unique: true

  create_table "countries", force: :cascade do |t|
    t.string   "label"
    t.integer  "idStore_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "countries", ["idStore_id"], name: "index_countries_on_idStore_id"

  create_table "images", force: :cascade do |t|
    t.string   "name"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "idApp_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "images", ["idApp_id"], name: "index_images_on_idApp_id"

  create_table "stores", force: :cascade do |t|
    t.string   "baseRouterUrl"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "top10s", force: :cascade do |t|
    t.integer  "idApp_id"
    t.integer  "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "top10s", ["idApp_id"], name: "index_top10s_on_idApp_id"

end