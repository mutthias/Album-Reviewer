import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    name: String!
    password: String!
    reviews: [Review]
  }

  input UserInput {
    name: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    users(ids: [ID]!): [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;
export default typeDefs;
