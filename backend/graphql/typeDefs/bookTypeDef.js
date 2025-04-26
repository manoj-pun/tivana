// /graphql/typeDefs/bookTypeDef.js

import { gql } from 'graphql-tag';

export const bookTypeDef = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;
