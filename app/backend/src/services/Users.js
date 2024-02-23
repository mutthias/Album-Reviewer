import prisma from "../prisma/client.js";

export default class Users {
  // CREATE
  static async create({ input }) {
    const { name, password } = input;
    const user = await prisma.user.create({
      data: {
        name,
        password,
      },
    });
    return user;
  }

  // READ
  static async find({ id }) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findByName({ name }) {
    return prisma.user.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });
  }

  static async findMany({ ids }) {
    return prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UDPATE
  static async update({ id, input }) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: input,
      });
      return user;
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete({ id }) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // OTHER
  static async getReviews({ id }) {
    return prisma.review.findMany({
      where: {
        userId: id,
      },
    });
  }
}
