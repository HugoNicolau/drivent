import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch(e) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params);
  try {
    const hotel = await hotelService.getHotelById(id);
    return res.status(httpStatus.OK).send(hotel);
  } catch(e) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
