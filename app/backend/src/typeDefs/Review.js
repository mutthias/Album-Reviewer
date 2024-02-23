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
    image: String
    artist: String
  }

  input CreateReviewInput {
    userId: String!
    content: String!
    title: String!
    score: Int!
    image: String!
    artist: String!
  }

  type Query {
    review(id: String!): Review
    reviewsByUserId(userId: String!): [Review] 
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: String!): Boolean
  }

`;
export default typeDefs;
