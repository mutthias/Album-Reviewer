// Resolver
import Review from "../services/Review.js";
import Users from "../services/Users.js";

const resolvers = {
  Review: {
    user: ({ userId }) => Users.find({ id: userId }),
  },
  Query: {
    review: (_, { id }) => Review.find({ id }),
    reviews: (_, { userId }) => Review.findByUserId(userId),
  },
  Mutation: {
    createReview: (_, { input }) => Review.create(input),
  },
};
export default resolvers;