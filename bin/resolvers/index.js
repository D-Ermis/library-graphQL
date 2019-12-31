"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bookResolvers = _interopRequireDefault(require("./bookResolvers"));

var _userResolvers = _interopRequireDefault(require("./userResolvers"));

var _commentResolvers = _interopRequireDefault(require("./commentResolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_userResolvers.default, _bookResolvers.default, _commentResolvers.default];
exports.default = _default;