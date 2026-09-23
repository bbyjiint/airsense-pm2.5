import { describe, expect, it } from "bun:test";
import request from "supertest";
import app from "../src/index.js";
import { generateUUIDv7 } from "../src/utils/uuid.js";

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

  it("UUIDv7 generator should produce valid RFC 9562 UUIDv7", () => {
    const uuid1 = generateUUIDv7();
    const uuid2 = generateUUIDv7();

    // Standard UUID regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid1).toMatch(uuidRegex);
    expect(uuid2).toMatch(uuidRegex);
    expect(uuid1).not.toBe(uuid2);

    // UUIDv7 is time-ordered
    expect(uuid1 <= uuid2).toBe(true);
  });
});
