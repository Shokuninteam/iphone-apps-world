class WelcomeController < ApplicationController
  def index
  		@top10 = Top10.where(app_id: App.all)
    	render json: @top10
  end
end
