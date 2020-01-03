import { gql } from 'apollo-server';

export default gql`
  type Comment {
    id: ID!
    content: String!
    author: User!
    title: String!
    book: Book!
    evaluation: Evaluation
  }

  extend type Query {
    comment(id: ID!): Comment!
    comments: [Comment!]!
  }

  extend type Mutation {
    createComment(
      content: String!
      title: String
      book: ID!
      evaluation: Evaluation
    ): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment
  }

  enum Evaluation {
    ONE
    TWO
    THREE
    FOUR
    FIVE
  }
`;
