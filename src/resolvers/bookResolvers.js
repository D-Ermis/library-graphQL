import { AuthenticationError } from 'apollo-server';

const isbnGet = require('node-isbn');

export default {
  Query: {
    book: async (parent, { id }, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.findById({ _id: id }).exec();
      return book;
    },
    books: async (parent, args, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const books = await bookModel.find({ author: me.id }).exec();
      return books;
    }
  },
  Mutation: {
    createBook: async (
      parent,
      { title, subtitle, stock },
      { models: { bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.create({
        title,
        subtitle,
        stock,
        available: stock,
        author: me.id
      });
      return book;
    },
    updateBook: async (
      parent,
      { id, title, subtitle },
      { models: { bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.findByIdAndUpdate(
        id,
        { $set: { title, subtitle } },
        { new: true }
      );
      return book;
    },
    deleteBook: async (parent, { id }, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.findByIdAndRemove({ _id: id }).exec();
      if (!book) {
        throw new Error('Error. Book not found!');
      }
      return book;
    }
  },
  Book: {
    author: ({ author }, args, { models: { userModel } }, info) =>
      userModel.findById({ _id: author }).exec(),
    comments: ({ id }, args, { models: { commentModel } }, info) =>
      commentModel.find({ book: id }).exec()
  }
};
