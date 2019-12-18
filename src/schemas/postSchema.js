import { gql } from 'apollo-server';

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    stock: Int
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
    postsAge(stock: Int): [Post]
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;
