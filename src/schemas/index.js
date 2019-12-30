import userSchema from './userSchema';
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
`;

export default [linkSchema, userSchema, bookSchema, commentSchema];
