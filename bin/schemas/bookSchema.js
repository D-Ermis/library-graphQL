"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _default = _apolloServer.gql`
  type Book {
    id: ID!
    title: String!
    subtitle: String!
    #content: String!
    author: User!
    editor: String!
    format: String!
    language: String!
    cover: String!
    stock: Int!
    isbn: String
    comments: [Comment]
  }

  extend type Query {
    book(id: ID!): Book!
    books: [Book!]!
  }

  extend type Mutation {
    createBook(title: String!, subtitle: String!): Book!
    createBookByISBN(isbn: String!): Book
    updateBook(id: ID!, title: String!, subtitle: String!): Book!
    deleteBook(id: ID!): Book
  }
`;

exports.default = _default;