"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentSchema = new _mongoose.default.Schema({
  content: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  eval: {
    type: Number,
    required: false
  },
  author: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  },
  book: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'book'
  }
});

const comment = _mongoose.default.model('comment', commentSchema);

var _default = comment;
exports.default = _default;