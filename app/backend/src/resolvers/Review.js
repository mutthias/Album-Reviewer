import Review from "../services/Review.js";
import Users from "../services/Users.js";

const resolvers = {
  Review: {
    user: ({ userId }) => Users.find({ id: userId }),
  },
  Query: {
    review: (_, { id }) => Review.find({ id }),
    reviews: () => Review.findAll(),
  },
  Mutation: {
    createReview: (_, { userId, input }) =>
      Review.create({ userId, input }),
  },
};
export default resolvers;
