import Post from '../models/Post.js'; // adjust the path based on your structure

export const postResolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    },
    post: async (_, { id }) => {
      try {
        const post = await Post.findById(id);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      } catch (error) {
        throw new Error('Failed to fetch the post');
      }
    }
  },

  Mutation: {
    createPost: async (_, { userId, thumbnail, description, dropdowns }) => {
      try {
        const newPost = new Post({
          userId,
          thumbnail,
          description,
          dropdowns
        });

        const savedPost = await newPost.save();
        return savedPost;
      } catch (error) {
        throw new Error('Failed to create post');
      }
    }
  }
};

export default postResolvers;