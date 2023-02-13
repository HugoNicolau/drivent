import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createBookingWithUserId(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      id: faker.datatype.number(),
      userId,
      roomId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future()
    }
  });
}

