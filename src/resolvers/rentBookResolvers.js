import { AuthenticationError } from 'apollo-server';

const DATE_DIFF = require('date-diff-js');

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
      { models: { rentBookModel, userModel, bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      // Get Current Date
      const startDate = Date.now();

      // Get user
      const user = await userModel.findById({ _id: me.id });
      console.log(user.rentCount);
      if (!(user.rentCount < 5)) {
        throw new Error('Rent limit exceeded MF!');
      }

      let oldDateOfRental = user.oldestDateOfRental[0];
      console.log('old date :', oldDateOfRental);
      let diffMonths = DATE_DIFF(Date.now(), oldDateOfRental, 'm').output;
      console.log('diff months :', diffMonths);
      if (diffMonths > 0) {
        throw new Error('Give the book back MF!');
      }

      // Check book availability
      const bookAvailable = await bookModel.findById({ _id: book });
      if (!(bookAvailable.available > 0)) {
        throw new Error('Book not available MF!');
      }

      // Increment user rental count
      const newRent = user.rentCount + 1;

      // Update User rental count
      await userModel.findByIdAndUpdate(
        me.id,
        { $set: { rentCount: newRent } },
        { new: true }
      );

      // Decrement book counts
      const availability = bookAvailable.available - 1;

      //User Rent a Book
      const rentBook = await rentBookModel.create({
        book,
        author: me.id,
        startDate
      });

      await userModel.findByIdAndUpdate(
        me.id,
        { $push: { oldestDateOfRental: rentBook.id } },
        { new: true }
      );

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
      { id },
      { models: { rentBookModel, userModel, bookModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      // Get Current Date
      const endDate = Date.now();

      // Check book availability
      const bookID = await rentBookModel.findById({ _id: id });
      const bookAvailable = await bookModel.findById({
        _id: bookID.book
      });
      // Increment book counts
      const availability = bookAvailable.available + 1;

      // Check user rental count
      const userRentCount = await userModel.findById({ _id: me.id });
      // Decrement user rental count
      const newRent = userRentCount.rentCount - 1;
      // Update availability
      await bookModel.findByIdAndUpdate(
        book,
        { $set: { available: availability } },
        { new: true }
      );
      // Update User rental count
      await userModel.findByIdAndUpdate(
        me.id,
        { $set: { rentCount: newRent } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(me.id, {
        $pull: { oldestDateOfRental: id }
      });

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
