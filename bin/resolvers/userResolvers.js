"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    user: async (parent, {
      id
    }, {
      models: {
        userModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const user = await userModel.findById({
        _id: id
      }).exec();
      return user;
    },
    login: async (parent, {
      name,
      password
    }, {
      models: {
        userModel
      }
    }, info) => {
      const user = await userModel.findOne({
        name
      }).exec();

      if (!user) {
        throw new _apolloServer.AuthenticationError('Invalid credentials');
      }

      const matchPasswords = _bcrypt.default.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new _apolloServer.AuthenticationError('Invalid credentials');
      }

      const token = _jsonwebtoken.default.sign({
        id: user.id
      }, 'riddlemethis', {
        expiresIn: 24 * 10 * 500
      });

      return {
        token
      };
    }
  },
  Mutation: {
    createUser: async (parent, {
      name,
      password
    }, {
      models: {
        userModel
      }
    }, info) => {
      const user = await userModel.create({
        name,
        password
      });
      return user;
    }
  },
  User: {
    books: async ({
      id
    }, args, {
      models: {
        bookModel
      }
    }, info) => {
      const books = await bookModel.find({
        author: id
      }).exec();
      return books;
    }
  }
};
exports.default = _default;