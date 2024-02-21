import prisma from "../prisma/client.js";

export default class Reviews {
  // CREATE
  static async create(input) {
    const { userId, content, title, score } = input;
    const review = await prisma.review.create({
      data: {
        userId,
        content,
        title,
        score,
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

  static async findByUserId(userId) {
    return prisma.review.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
