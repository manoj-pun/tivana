import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/schema.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

async function startServer() {
  const app = express();

  dotenv.config();

  // Apply express.json() middleware before CORS and Apollo Server middleware
  app.use(express.json());  // Ensure this is called before Apollo

  // Apply CORS middleware before Apollo Server middleware
  app.use(cors());

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Connect to the database
  await connectDB();

  // Apollo Server middleware to handle GraphQL requests
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };  // Make sure you pass the req and res to the context
    },
  }));

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
