import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false // True
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
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
  stock: {
    type: Number,
    required: false
  }
});

const post = mongoose.model("post", postSchema);

export default post;
