import { Request, Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";

export async function getHotels(req: Request, res: Response) {
  try {
    const hotels = await hotelService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch(e) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelById(req: Request, res: Response) {
  const id = Number(req.params);
  try {
    const hotel = await hotelService.getHotelById(id);
    return res.status(httpStatus.OK).send(hotel);
  } catch(e) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
