class GlobalsController < ApplicationController

	def index
		@top10 = App.joins(:top10s).where(released: true).order("rank")
    	@articles = App.where(released: true).limit(10).order("updated_at")
    	@categories = Category.all
    	@count = App.count(released: true)
		render :json => {
			:top10 => @top10,
  			:articles => @articles,
  			:categories => @categories,
  			:total => @count
			 }
	end

	def page
		@num = calcOffset(params[:page].to_i)
		puts(@num)
		@articles = App.where(released: true).limit(10).offset(@num).order("updated_at")
		render json: @articles
	end

	def calcOffset(num)
		return num * 10 - 10
	end


end
