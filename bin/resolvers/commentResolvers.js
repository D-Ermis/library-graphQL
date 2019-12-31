"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _default = {
  Query: {
    comment: async (parent, {
      id
    }, {
      models: {
        commentModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const comment = await commentModel.findById({
        _id: id
      }).exec();
      return comment;
    },
    comments: async (parent, args, {
      models: {
        commentModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const comments = await commentModel.find().exec();
      return comments;
    }
  },
  Mutation: {
    createComment: async (parent, {
      content,
      title,
      book
    }, {
      models: {
        commentModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const comment = await commentModel.create({
        content,
        title,
        book: book,
        author: me.id
      });
      return comment;
    },
    updateComment: async (parent, {
      id,
      content
    }, {
      models: {
        commentModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const comment = await commentModel.findByIdAndUpdate(id, {
        $set: {
          content
        }
      }, {
        new: true
      });
      return comment;
    },
    deleteComment: async (parent, {
      id
    }, {
      models: {
        commentModel
      },
      me
    }, info) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('You are not authenticated');
      }

      const comment = await commentModel.findByIdAndRemove({
        _id: id
      }).exec();

      if (!comment) {
        throw new Error('Error. Comment not found!');
      }

      return comment;
    }
  },
  Comment: {
    author: ({
      author
    }, args, {
      models: {
        userModel
      }
    }, info) => userModel.findById({
      _id: author
    }).exec(),
    book: ({
      book
    }, args, {
      models: {
        bookModel
      }
    }, info) => bookModel.findById({
      _id: book
    }).exec()
  }
};
exports.default = _default;