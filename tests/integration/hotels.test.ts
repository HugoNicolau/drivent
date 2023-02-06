import app, { init } from "@/app";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});
  
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels", () => {
  describe("auth tests", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels");
        
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
        
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
        
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});

describe("GET /hotels/:id", () => {
  describe("auth tests", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels/:id");
        
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
        
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
        
      const response = await server.get("/hotels/:id").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    
      const response = await server.get("/hotels/:id").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});
