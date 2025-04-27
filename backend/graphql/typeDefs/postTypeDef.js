import gql from 'graphql-tag';

export const typeDefs = gql`
  type Dropdown {
    title: String!
    subTitle: String
    dropdownImages: [String!]!
    description: String!
  }

  type Post {
    _id: ID!
    userId: String!
    thumbnail: String!
    description: String!
    dropdowns: [Dropdown!]!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(
      userId: String!
      thumbnail: String!
      description: String!
      dropdowns: [DropdownInput!]!
    ): Post!
  }

  input DropdownInput {
    title: String!
    subTitle: String
    dropdownImages: [String!]!
    description: String!
  }
`;

export default typeDefs;