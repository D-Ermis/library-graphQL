import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    post: async (parent, { id }, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.findById({ _id: id }).exec();
      return post;
    },
    posts: async (parent, args, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await postModel.find({ author: me.id }).exec();
      return posts;
    }
  },
  Mutation: {
    createPost: async (
      parent,
      { title, subtitle },
      { models: { postModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.create({ title, subtitle, author: me.id });
      return post;
    },
    updatePost: async (
      parent,
      { id, title, subtitle },
      { models: { postModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.findById({ _id: id }).exec();

      let update = { 'post.title': title, 'post.subtitle': subtitle };
      let post2 = await postModel.findByIdAndUpdate(
        id,
        {
          $set: {
            update
          }
        },
        { new: true }
      );

      return post2;
    }
  },
  Post: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    }
  }
};
