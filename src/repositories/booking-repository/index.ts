import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true,
    }
  });
}

async function isAvailable(id: number) {
  const room = await prisma.room.findUnique({
    where: {
      id
    },
    include: {
      Booking: true
    }
  });
  const capacityFree = room.capacity - room.Booking.length;
  const available = capacityFree>0;
  
  return (available);
}
async function roomExists(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

async function postBooking(bookingData: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      ...bookingData
    }
  });
}

export type CreateBookingParams = Omit<Booking, "id" | "createdAt" | "updatedAt">

const bookingRepository = {
  findBooking,
  postBooking,
  isAvailable,
  roomExists
};

export default bookingRepository;
