"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  books: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'book'
  }]
});
userSchema.pre('save', function () {
  const hashedPassword = _bcrypt.default.hashSync(this.password, 12);

  this.password = hashedPassword;
});

const user = _mongoose.default.model('user', userSchema);

var _default = user;
exports.default = _default;