import { describe, expect, it } from "bun:test";
import request from "supertest";
import app from "../src/app.js";

describe("AirSense Backend API Integration Tests", () => {
  it("GET / should return running message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "AirSense API is running" });
  });

  it("POST /api/devices should fail with 400 when missing required fields", async () => {
    const res = await request(app)
      .post("/api/devices")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("device_code, name, latitude and longitude are required");
  });

  it("POST /api/readings should fail with 400 when missing required fields", async () => {
    const res = await request(app)
      .post("/api/readings")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("device_code, pm25, temperature and humidity are required");
  });
});
