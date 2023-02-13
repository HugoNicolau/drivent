import { ApplicationError } from "@/protocols";

export function cannotPostBookingError(): ApplicationError {
  return {
    name: "CannotPostBookingError",
    message: "Cannot create booking!",
  };
}
