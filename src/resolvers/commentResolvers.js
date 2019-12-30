import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    comment: async (parent, { id }, { models: { commentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const comment = await commentModel.findById({ _id: id }).exec();
      return comment;
    },
    comments: async (parent, args, { models: { commentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const comments = await commentModel.find().exec();
      return comments;
    }
  },
  Mutation: {
    createComment: async (
      parent,
      { content, title },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const comment = await commentModel.create({
        content,
        title,
        author: me.id
      });
      return comment;
    },
    updateComment: async (
      parent,
      { id, content },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const comment = await commentModel.findByIdAndUpdate(
        id,
        { $set: { content } },
        { new: true }
      );
      return comment;
    },
    deleteComment: async (
      parent,
      { id },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const comment = await commentModel.findByIdAndRemove({ _id: id }).exec();
      if (!comment) {
        throw new Error('Error. Comment not found!');
      }
      return comment;
    }
  },
  Comment: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    }
  }
};
