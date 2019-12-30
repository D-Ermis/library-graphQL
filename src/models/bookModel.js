import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false // True
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  editor: {
    type: String,
    required: false // True
  },
  format: {
    type: String,
    required: false // True
  },
  language: {
    type: String,
    required: false // True
  },
  cover: {
    type: String,
    required: false // True
  },
  comments: {
    type: Array,
    required: false
  },
  stock: {
    type: Number,
    required: false
  }
});

const book = mongoose.model('book', bookSchema);

export default book;
