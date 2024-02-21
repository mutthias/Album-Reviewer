import gql from "graphql-tag";

const typeDefs = gql`
  type Review {
    id: String!
    user: User!
    content: String!
    title: String!
    score: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateReviewInput {
    userId: String!
    content: String!
    title: String!
    score: Int!
  }

  type Query {
    review(id: String!): Review
    reviews(ids: ID!): [Review]
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: String!): Boolean
  }

`;
export default typeDefs;
