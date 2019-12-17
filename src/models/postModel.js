import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  editor: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

const post = mongoose.model('post', postSchema);

export default post;
