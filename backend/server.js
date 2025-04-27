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
  
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  await connectDB();

  // Apply CORS middleware before express.json()
  app.use(cors());

  // Apply express.json() middleware before Apollo Server middleware
  app.use(express.json());

  // Apollo Server middleware to handle GraphQL requests
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };
    },
  }));

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
