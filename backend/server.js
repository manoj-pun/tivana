// server.js

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { schema } from './graphql/schema.js';  // Import the final schema

async function startServer() {
  const app = express();
  
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
  });

  await server.start();

  // Apply CORS middleware before express.json()
  app.use(cors());

  // Apply express.json() middleware before Apollo Server middleware
  app.use(express.json());

  // Apollo Server middleware to handle GraphQL requests
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || '';  // Token or other context info
      return { req, res, token };
    },
  }));

  // Start the server
  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();
