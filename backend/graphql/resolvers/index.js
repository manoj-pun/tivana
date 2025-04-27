import postResolvers from "./postResolver.js";

export const resolvers = {
  Query: {
    ...postResolvers.Query
  },

  Mutation:{
    ...postResolvers.Mutation
  }
};
