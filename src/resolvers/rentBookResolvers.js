import { AuthenticationError } from 'apollo-server';
import bookModel from '../models/bookModel';
import userModel from '../models/userModel';

export default {
  Query: {
    rentBook: async (
      parent,
      { id },
      { models: { rentBookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rentBook = await rentBookModel.findById({ _id: id }).exec();
      return rentBook;
    },
    listRentBook: async (
      parent,
      args,
      { models: { rentBookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const listRentBook = await rentBookModel.find({ author: me.id }).exec();
      return listRentBook;
    }
  },
  Mutation: {
    createRentBook: async (
      parent,
      { book },
      { models: { rentBookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      // Get Current Date
      const startDate = Date.now();

      // Check user rental count
      const userRentCount = await userModel.findById({ _id: me.id });
      if (!(userRentCount.rentCount < 5)) {
        throw new Error('Rent limit exceeded MF!');
      }

      // Check book availability
      const bookAvailable = await bookModel.findById({ _id: book });
      if (!(bookAvailable.available > 0)) {
        throw new Error('Book not available MF!');
      }

      // Increment user rental count
      const newRent = userRentCount.rentCount + 1;
      console.log(newRent);

      // Update User rental count
      await userModel.findByIdAndUpdate(
        me.id,
        { $set: { rentCount: newRent } },
        { new: true }
      );

      // Decrement book counts
      const availability = bookAvailable.available - 1;
      const rentBook = await rentBookModel.create({
        book,
        author: me.id,
        startDate
      });

      // Update availability
      await bookModel.findByIdAndUpdate(
        book,
        { $set: { available: availability } },
        { new: true }
      );
      return rentBook;
    },
    updateRentBook: async (
      parent,
      { id, book },
      { models: { rentBookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      // Get Current Date
      const endDate = Date.now();

      // Check book availability
      const bookAvailable = await bookModel.findById({ _id: book });
      // Increment book counts
      const availability = bookAvailable.available + 1;

      // Update availability
      await bookModel.findByIdAndUpdate(
        book,
        { $set: { available: availability } },
        { new: true }
      );

      // Update availability
      const rentBook = await rentBookModel.findByIdAndUpdate(
        id,
        { $set: { endDate } },
        { new: true }
      );
      return rentBook;
    },
    deleteRentBook: async (
      parent,
      { id },
      { models: { rentBookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rentBook = await rentBookModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!rentBook) {
        throw new Error('Error. RentBook not found!');
      }
      return rentBook;
    }
  },
  RentBook: {
    author: ({ author }, args, { models: { userModel } }, info) =>
      userModel.findById({ _id: author }).exec(),
    book: ({ book }, args, { models: { bookModel } }, info) =>
      bookModel.findById({ _id: book }).exec()
  }
};
