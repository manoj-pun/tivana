import gql from "graphql-tag";  //Imports gql, a function to write GraphQL schema definitions.

//Starts defining your GraphQL schema using backticks `
const userTypeDefs = gql`
    type User {
        _id: ID!
        username: String!
        fullname: String!
        email: String!
        password: String!
        # profileImage: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        registerUser(input: UserInput!): User!
        loginUser(input: LoginInput!): User!
    }

    input UserInput {
        username: String!
        fullname: String!
        email: String!
        password: String!
        # profileImage: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }
`;

export default userTypeDefs;