import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const rentBook = mongoose.model('rentBook', rentSchema);

export default rentBook;
