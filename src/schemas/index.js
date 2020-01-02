import userSchema from './userSchema';
import rentBookSchema from './rentBookSchema';
import bookSchema from './bookSchema';
import commentSchema from './commentSchema';
import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  scalar Date
`;

export default [
  linkSchema,
  userSchema,
  bookSchema,
  commentSchema,
  rentBookSchema
];
