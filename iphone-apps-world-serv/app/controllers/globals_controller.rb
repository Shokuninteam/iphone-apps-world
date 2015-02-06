class GlobalsController < ApplicationController

	def index
		@top10 = App.joins(:top10s).where(released: true).order("rank")
    	@articles = App.where(released: true).paginate(page: params[:page]).order("updated_at")
    	@categories = Category.all
		render :json => {
			:top10 => @top10,
  			:articles => @articles,
  			:categories => @categories,
			 }
		
	end

end
