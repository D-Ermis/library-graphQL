"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookSchema = new _mongoose.default.Schema({
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
    type: _mongoose.default.Schema.Types.ObjectId,
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

const book = _mongoose.default.model('book', bookSchema);

var _default = book;
exports.default = _default;