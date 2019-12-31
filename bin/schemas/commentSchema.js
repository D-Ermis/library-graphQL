"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _default = _apolloServer.gql`
  type Comment {
    id: ID!
    content: String!
    author: User!
    title: String!
    book: Book!
    eval: Int!
  }

  extend type Query {
    comment(id: ID!): Comment!
    comments: [Comment!]!
  }

  extend type Mutation {
    createComment(content: String!, title: String, book: ID!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment
  }
`;

exports.default = _default;