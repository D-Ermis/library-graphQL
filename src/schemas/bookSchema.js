import { gql } from 'apollo-server';

export default gql`
  type Book {
    id: ID!
    title: String!
    subtitle: String!
    author: User!
    editor: String!
    format: String!
    language: String!
    cover: String!
    stock: Int!
    isbn: String
    comments: [Comment]
    available: Int
  }

  extend type Query {
    book(id: ID!): Book!
    books: [Book!]!
  }

  extend type Mutation {
    createBook(title: String!, subtitle: String!, stock: Int!): Book!
    updateBook(id: ID!, title: String!, subtitle: String!): Book!
    deleteBook(id: ID!): Book
  }
`;
