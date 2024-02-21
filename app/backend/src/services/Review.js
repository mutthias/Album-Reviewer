import prisma from "../prisma/client.js";

export default class Reviews {
  // CREATE
  static async create({ userId, input }) {
    const { name } = input;
    const review = await prisma.review.create({
      data: {
        userId,
        name,
      },
    });
    return review;
  }

  // READ
  static async find({ id }) {
    return prisma.review.findUnique({ where: { id } });
  }

  static async findAll() {
    return prisma.review.findMany();
  }


}
