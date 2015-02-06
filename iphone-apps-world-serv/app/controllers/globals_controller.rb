class GlobalsController < ApplicationController

	def index

		@top10 = App.joins(:top10s).order("rank")
		#@top10 = Top10.where(app_id: App.all)
    	
		render json: @top10
	end

end
