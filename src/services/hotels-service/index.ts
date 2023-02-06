import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";

async function getHotels() {
  const hotels = await hotelsRepository.findHotels();
  if(!hotels) {
    throw notFoundError;
  }
  return hotels;
}

async function getHotelById(id: number) {
  const hotel = await hotelsRepository.findHotel(id);
  if(!hotel) {
    throw notFoundError;
  }
  return hotel;
}

const hotelService = {
  getHotels,
  getHotelById
};

export default hotelService;
