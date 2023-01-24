import { ApplicationError } from "@/protocols";

export function invalidCEPAddress(): ApplicationError {
  return {
    name: "InvalidCEPAddress",
    message: "This CEP address doesn't exists. ",
  };
}
