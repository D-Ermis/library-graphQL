import { AuthenticationError } from 'apollo-server';

const isbnGet = require('node-isbn');

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
    createPostByISBN: async (
      parent,
      { isbn },
      { models: { postModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      isbnGet
        .resolve(isbn)
        .then(function(book) {
          console.log(book.title);
          const post = postModel.create({
            isbn,
            title: book.title,
            format: book.printType,
            language: book.language
          });
          post.then(function(result) {
            console.log(post); // "Some User token"
            return post;
          });
        })
        .catch(function(err) {
          console.log('Book not found', err);
        });
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
      const post = await postModel.findByIdAndUpdate(
        id,
        { $set: { title, subtitle } },
        { new: true }
      );
      // $set: { title: title, subtitle: subtitle } can be simplified to $set: { title, subtitle }
      return post;
    },
    deletePost: async (parent, { id }, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.findByIdAndRemove({ _id: id }).exec();
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
