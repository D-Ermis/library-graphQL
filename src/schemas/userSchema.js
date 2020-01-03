import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    books: [Book!]!
    comments: [Comment]
    rentCount: Int!
    oldestDateOfRental: [String]
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    login(name: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(name: String!, password: String!): User!
    updateUser(id: ID!): User!
  }
`;
