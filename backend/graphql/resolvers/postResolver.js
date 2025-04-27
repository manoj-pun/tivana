import Post from "../../models/postModel.js";

const postResolvers = {
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
    createPost: async(_, {input}) => {
      try {
        const newPost = new Post(input);
        const savedPost = await newPost.save();
        return savedPost;
      } catch (error) {
        throw new Error('Failed to create post');
      }
    }
  }
};

export default postResolvers;