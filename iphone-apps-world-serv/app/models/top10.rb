class Top10 < ActiveRecord::Base
  belongs_to :app
  has_many :apps
end
