import Users from "../services/Users.js";

const resolvers = {
  User: {
    reviews: ({ id }) => Users.getReviews({ id }),
  },
  Query: {
    user: (_, { id }) => Users.find({ id }),
    userByName: (_, { name }) => Users.findByName({ name }),
  },
  Mutation: {
    createUser: (_, { input }) => Users.create({ input }),
    updateUser: (_, { id, input }) => Users.update({ id, input }),
    deleteUser: (_, { id }) => Users.delete({ id }),
  },
};

export default resolvers;
