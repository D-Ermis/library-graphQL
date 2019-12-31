"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userSchema = _interopRequireDefault(require("./userSchema"));

var _bookSchema = _interopRequireDefault(require("./bookSchema"));

var _commentSchema = _interopRequireDefault(require("./commentSchema"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkSchema = _apolloServer.gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
var _default = [linkSchema, _userSchema.default, _bookSchema.default, _commentSchema.default];
exports.default = _default;