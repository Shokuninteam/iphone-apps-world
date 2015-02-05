class App < ActiveRecord::Base
  belongs_to :idCategory
  has_many :images, dependent: :destroy
  has_many :top10s
  validates :name, :description, presence: true
end
