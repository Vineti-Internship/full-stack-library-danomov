class BookSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :rating, :author_id
end
