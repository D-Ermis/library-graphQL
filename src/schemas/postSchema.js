import { gql } from 'apollo-server';

export default gql`
  type Post {
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
    comments: [comment]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    book: [Post]
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  extend type Mutation {
    createPost(title: String!, subtitle: String!): Post!
    createPostByISBN(isbn: String!): Post
    updatePost(id: ID!, title: String!, subtitle: String!): Post!
    deletePost(id: ID!): Post
  }
`;
