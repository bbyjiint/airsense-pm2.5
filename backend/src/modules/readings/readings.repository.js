import pool from "../../db.js";

export const readingsRepository = {
  async findLatestAll() {
    const query = `
      SELECT
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
        ON r.id = (
          SELECT id
          FROM readings
          WHERE device_id = d.id
          ORDER BY created_at DESC, id DESC
          LIMIT 1
        )
      ORDER BY d.id ASC;
    `;

    const [rows] = await pool.query(query);
    return rows;
  },

  async create(deviceId, data) {
    const [result] = await pool.query(
      `INSERT INTO readings (device_id, pm25, temperature, humidity)
       VALUES (?, ?, ?, ?)`,
      [deviceId, data.pm25, data.temperature, data.humidity]
    );

    const [rows] = await pool.query(
      `SELECT id, device_id, pm25, temperature, humidity, created_at
       FROM readings WHERE id = ? LIMIT 1`,
      [result.insertId]
    );

    const created = rows[0];
    if (!created) {
      throw new Error("Failed to retrieve created reading");
    }
    return created;
  }
};
