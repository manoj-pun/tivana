import postResolvers from "./postResolver.js";
import userResolvers from "./userResolver.js";

export const resolvers = {
  Query: {
    ...postResolvers.Query
  },

  Mutation:{
    ...userResolvers.Mutation,
    ...postResolvers.Mutation
    
  }
};
