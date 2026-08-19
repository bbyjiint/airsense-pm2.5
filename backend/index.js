import express from "express";
import cors from "cors";
import "dotenv/config";

import devicesRoute from "./routes/devices.js";
import readingsRoute from "./routes/reading.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AirSense API is running" });
});

app.use("/api/devices", devicesRoute);
app.use("/api/readings", readingsRoute);

app.listen(PORT, () => {
  console.log(`AirSense API running at http://localhost:${PORT}`);
});
