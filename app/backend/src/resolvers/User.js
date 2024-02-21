import Users from "../services/Users.js";

const resolvers = {
  User: {
    reviews: ({ name }) => Users.getReviews({ name }),
  },
  Query: {
    user: (_, { name }) => Users.find({ name }),
  },
  Mutation: {
    createUser: (_, { input }) => Users.create({ input }),
    updateUser: (_, { name, input }) => Users.update({ name, input }),
    deleteUser: (_, { name }) => Users.delete({ name }),
  },
};

export default resolvers;
