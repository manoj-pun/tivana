import { gql } from 'graphql-tag';

const postTypeDefs = gql`

  type Post {
    _id: ID!
    userId: ID!
    thumbnail: String!
    description: String!
    dropdowns: [Dropdown!]!
  }

  type Dropdown {
    title: String!
    subTitle: String
    dropdownImages: [String!]!
    description: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(input: PostInput!): Post!
  }

  input PostInput {
    userId: String!
    thumbnail: String!
    description: String!
    dropdowns: [DropdownInput!]!
  }

  input DropdownInput {
    title: String!
    subTitle: String
    dropdownImages: [String!]!
    description: String!
  }

`;

export default postTypeDefs;
