import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/booking", getBooking);

export { bookingRouter };
