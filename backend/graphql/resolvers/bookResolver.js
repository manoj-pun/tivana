// /graphql/resolvers/bookResolver.js

import books from '../../config/book.js';  // Import the default export

export const bookResolver = {
  Query: {
    books: () => books,  // Return the full list of books
    book: (_, { id }) => books.find((book) => book.id === id),  // Get a single book by id
  },
};
