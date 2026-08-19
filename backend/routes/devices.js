import express from "express";
import sql from "../db.js";

const router = express.Router();


// GET ALL DEVICES
router.get("/", async (req, res) => {
  try {
    const devices = await sql`
      SELECT *
      FROM devices
      ORDER BY id
    `;

    res.json(devices);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get devices"
    });
  }
});


// ADD NEW DEVICE
router.post("/", async (req, res) => {
  try {
    const {
      device_code,
      name,
      location_name,
      place_id,
      latitude,
      longitude
    } = req.body;

    if (
      !device_code ||
      !name ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "device_code, name, latitude and longitude are required"
      });
    }

    const result = await sql`
      INSERT INTO devices (
        device_code,
        name,
        location_name,
        place_id,
        latitude,
        longitude
      )
      VALUES (
        ${device_code},
        ${name},
        ${location_name},
        ${place_id},
        ${latitude},
        ${longitude}
      )
      RETURNING *
    `;

    res.status(201).json(result[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add device"
    });
  }
});


export default router;