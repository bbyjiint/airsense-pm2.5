import express from "express";
import cors from "cors";
import "dotenv/config";

import devicesRouter from "./modules/devices/devices.routes.js";
import readingsRouter from "./modules/readings/readings.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AirSense API is running" });
});

app.use("/api/devices", devicesRouter);
app.use("/api/readings", readingsRouter);

export default app;
