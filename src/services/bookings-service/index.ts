import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) {
    throw notFoundError;
  }

  return {
    id: booking.id,
    Room: booking.Room
  };
}

const bookingService = {
  getBooking
};

export default bookingService;
