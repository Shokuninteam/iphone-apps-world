# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' },
#                       { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


##
categories = Category.create([{name: "divertissement"}, 
	{name: "jeux"},{name: "sport"},{name: "info"},
	{name: "musique"}, {name: "tele"}, {name: "chat"},
	{name: "prod"}
	])

apps = App.create([
	{
		name: 'twitter',
 		price: 10,
 		description: "blablabla description tiwtter1",
 		analysis: "blablabla analysis twitter1",
 		pros: "blabla pros1",
 		cons: "blabla cons1",
 		category: categories.first,
 		released: true
 	},
 	{
 		name: 'youtube',
		price: 0,
 		description: "blablabla description youtube",
 		analysis: "blablabla analysis youtube",
 		pros: "blabla pro youtube",
 		cons: "blabla con youtube",
 		released: true,
 		category: categories.first
 	}
 ])

Top10.create([
	{
		app: apps.first,
		rank: 2
	},
	{
		app: apps.second,
		rank:1
	}
])