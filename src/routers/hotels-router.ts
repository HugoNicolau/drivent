import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getHotels, getHotelById } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken);
hotelsRouter.get("", getHotels);
hotelsRouter.get("/:hotelId", getHotelById);

export { hotelsRouter };
