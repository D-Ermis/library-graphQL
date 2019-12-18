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
    page: Int
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
    postsAge(stock: Int): [Post]
  }

  extend type Mutation {
    #createPost(title: String!, content: String!): Post!
    createPost(title: String!, subtitle: String!): Post!
    updatePost(id: ID!, title: String, subtitle: String): Post!
  }
`;
