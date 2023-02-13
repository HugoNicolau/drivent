import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/bookings-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const bookings = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
type Body = {
    roomId: number
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body as Body;
  
  if(!body.roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try{
    const bookings = await bookingService.postBooking(Number(userId), body);
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    if (error.name === "CannotPostBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body as Body;
  if(!body.roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try{
    const newBooking = await bookingService.updateBooking(Number(userId), body);
    return res.status(httpStatus.OK).send(newBooking);
  } catch (error) {
    if (error.name === "CannotPostBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
