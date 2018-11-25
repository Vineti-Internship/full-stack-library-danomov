class BookSerializer < ActiveModel::Serializer
  attributes :name, :description, :rating, :author_id
end
