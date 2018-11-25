class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :full_name
  has_many :books 
end
