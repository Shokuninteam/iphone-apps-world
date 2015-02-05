class Store < ActiveRecord::Base
	has_many :countries
	validates :label, presence: true
end
