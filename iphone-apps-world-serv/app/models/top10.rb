class Top10 < ActiveRecord::Base
  belongs_to :idApp
  has_many :apps
end
