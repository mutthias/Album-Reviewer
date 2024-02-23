import prisma from "../prisma/client.js";

export default class Reviews {
  // CREATE
  static async create(input) {
    const { userId, content, title, score, image, artist } = input;
    const review = await prisma.review.create({
      data: {
        userId,
        content,
        title,
        score,
        image,
        artist,
      },
    });
    return review;
  }

  static async delete({ id }) {
    try {
      await prisma.review.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // READ
  static async find({ id }) {
    return prisma.review.findUnique({ where: { id } });
  }


  // Updated method to fetch reviews by user ID
  static async findByUserId(userId) {
    return prisma.review.findMany({
      where: {
        userId: userId, // Filter reviews by the provided userId
      },
    });
  }
}
