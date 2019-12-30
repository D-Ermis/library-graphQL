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
      { title, subtitle },
      { models: { bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.create({ title, subtitle, author: me.id });
      return book;
    },
    createBookByISBN: async (
      parent,
      { isbn },
      { models: { bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      isbnGet
        .resolve(isbn)
        .then(function(book) {
          console.log(book.title);
          const book2 = bookModel.create({
            isbn,
            title: book.title,
            format: book.printType,
            language: book.language
          });
          book2.then(function(result) {
            console.log(book2); // "Some User token"
            return book2;
          });
        })
        .catch(function(err) {
          console.log('Book not found', err);
        });
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
      // $set: { title: title, subtitle: subtitle } can be simplified to $set: { title, subtitle }
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
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    }
  }
};
