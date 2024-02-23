// Resolver
import Review from "../services/Review.js";
import Users from "../services/Users.js";

const resolvers = {
  Review: {
    user: ({ userId }) => Users.find({ id: userId }),
  },
  Query: {
    review: (_, { id }) => Review.find({ id }),
    reviewsByUserId: (_, { userId }) => Review.findByUserId(),
  },
  Mutation: {
    createReview: (_, { input }) => Review.create(input),
    deleteReview: (_, { id }) => Review.delete({ id }),
  },
};
export default resolvers;