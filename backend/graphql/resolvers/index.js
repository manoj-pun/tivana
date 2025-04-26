// /graphql/resolvers/index.js

import { bookResolver } from './bookResolver.js';

export const resolvers = {
  Query: {
    ...bookResolver.Query,  // Merge the book query resolvers
  },
};
