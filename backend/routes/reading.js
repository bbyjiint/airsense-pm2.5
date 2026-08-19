import express from "express";
import sql from "../db.js";

const router = express.Router();


// ========================================
// GET LATEST READING OF ALL DEVICES
// GET /api/readings/latest-all
// ========================================

router.get("/latest-all", async (req, res) => {
  try {
    const readings = await sql`
      SELECT DISTINCT ON (d.id)
        d.id AS device_id,
        d.device_code,
        d.name,
        d.location_name,
        d.latitude,
        d.longitude,

        r.id AS reading_id,
        r.pm25,
        r.temperature,
        r.humidity,
        r.created_at

      FROM devices d

      LEFT JOIN readings r
        ON r.device_id = d.id

      ORDER BY d.id, r.created_at DESC
    `;

    res.json(readings);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get latest readings"
    });
  }
});


// ========================================
// ADD NEW SENSOR READING
// POST /api/readings
// ========================================

router.post("/", async (req, res) => {
  try {
    const {
      device_code,
      pm25,
      temperature,
      humidity
    } = req.body;

    if (
      !device_code ||
      pm25 === undefined ||
      temperature === undefined ||
      humidity === undefined
    ) {
      return res.status(400).json({
        message:
          "device_code, pm25, temperature and humidity are required"
      });
    }

    const devices = await sql`
      SELECT id
      FROM devices
      WHERE device_code = ${device_code}
      LIMIT 1
    `;

    if (devices.length === 0) {
      return res.status(404).json({
        message: "Device not found"
      });
    }

    const readings = await sql`
      INSERT INTO readings (
        device_id,
        pm25,
        temperature,
        humidity
      )
      VALUES (
        ${devices[0].id},
        ${pm25},
        ${temperature},
        ${humidity}
      )
      RETURNING
        id,
        device_id,
        pm25,
        temperature,
        humidity,
        created_at
    `;

    res.status(201).json({
      message: "Reading added successfully",
      data: readings[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add reading"
    });
  }
});


export default router;