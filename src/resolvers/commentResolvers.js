import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    post: async (parent, { id }, { models: { commentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await commentModel.findById({ _id: id }).exec();
      return post;
    },
    posts: async (parent, args, { models: { commentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await commentModel.find({ author: me.id }).exec();
      return posts;
    }
  },
  Mutation: {
    createPost: async (
      parent,
      { title, subtitle },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await commentModel.create({
        title,
        subtitle,
        author: me.id
      });
      return post;
    },
    updatePost: async (
      parent,
      { id, title, subtitle },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await commentModel.findByIdAndUpdate(
        id,
        { $set: { title, subtitle } },
        { new: true }
      );
      return post;
    },
    deletePost: async (
      parent,
      { id },
      { models: { commentModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await commentModel.findByIdAndRemove({ _id: id }).exec();
      if (!post) {
        throw new Error('Error. Post not found!');
      }
      return post;
    }
  },
  Post: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    }
  }
};
