import { notFoundError } from "@/errors";
import { cannotPostBookingError } from "@/errors/cannot-post-booking-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) {
    throw notFoundError;
  }

  return {
    id: booking,
    Room: booking.Room
  };
}

async function confirmUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotPostBookingError(); 
  }
}
type BodyBooking = {
    roomId: number
}

async function isAvailable(roomId: number) {
  const theresPlace = await bookingRepository.isAvailable(roomId);
  if(!theresPlace) {
    throw cannotPostBookingError();
  }
}

async function findRoom(roomId: number) {
  const room = await bookingRepository.roomExists(roomId);
  if(!room) {
    throw notFoundError();
  }
}
async function postBooking(userId: number, body: BodyBooking) {
  await confirmUser(userId);
  const { roomId } = body;
  await findRoom(roomId);
  await isAvailable(roomId);
  const bookingData = {
    userId,
    roomId        
  };
  await bookingRepository.postBooking(bookingData);

  const booking = await bookingRepository.findBooking(userId);
  return booking.id;
}

const bookingService = {
  getBooking,
  postBooking
};

export default bookingService;
