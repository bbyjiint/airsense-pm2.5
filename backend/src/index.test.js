import { describe, expect, it } from "bun:test";
import request from "supertest";
import app from "./index.js";

describe("Backend Index & 404 Error Handling Tests", () => {
  it("GET / returns API health message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("AirSense API is running");
  });

  it("GET /unknown-route returns standard 404 error envelope", async () => {
    const res = await request(app).get("/api/unknown-endpoint");
    expect(res.status).toBe(404);
    expect(res.body.message).toContain("not found");
  });
});
