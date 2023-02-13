import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBooking, postBooking, updateBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", postBooking)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
