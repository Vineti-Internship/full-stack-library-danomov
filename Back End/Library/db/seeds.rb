# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Author.create(id:1, full_name:"Stephen Hawking")
Author.create(id:2, full_name:"Nar Dos")

Book.create(id:1, name:"Killed Dove", description:"One of the best novels written by Nar Dos.It was written in 1889", rating:4, author_id:2)
Book.create(id:2, name:"The Theory of Everything", description:"'The Theory of Everything' is a unique opportunity to explore the cosmos with the greatest mind since Einstein. Based on a series of lectures given at Cambridge University, Professor Hawking's work introduced 'the history of ideas about the universe' as well as today's most important scientific theories about time, space, and the cosmos in a clear, easy-to-understand way.", rating:4, author_id:1)