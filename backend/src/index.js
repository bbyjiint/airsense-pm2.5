import express from "express";
import cors from "cors";
import "dotenv/config";

import devicesRouter from "./modules/devices/devices.routes.js";
import readingsRouter from "./modules/readings/readings.routes.js";
import { sendError, httpErrors } from "./utils/response.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
const corsOrigin = process.env.CORS_ORIGIN;
const corsOptions = {
  origin: corsOrigin && corsOrigin !== "*"
    ? corsOrigin.split(",").map((origin) => origin.trim())
    : "*",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AirSense API is running" });
});

app.use("/api/devices", devicesRouter);
app.use("/api/readings", readingsRouter);

// 404 Route Handler
app.use((req, res) => {
  sendError(res, httpErrors.notFound(`Route ${req.method} ${req.originalUrl} not found`));
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  sendError(res, err);
});

// Start server only when run directly, not when imported during tests
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`AirSense API running at http://localhost:${PORT}`);
  });
}

export default app;
