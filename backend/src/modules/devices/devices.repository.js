import pool from "../../db.js";

export const devicesRepository = {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT
        id,
        device_code,
        name,
        location_name,
        place_id,
        latitude,
        longitude,
        created_at
      FROM devices
      ORDER BY id ASC`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT
        id,
        device_code,
        name,
        location_name,
        place_id,
        latitude,
        longitude,
        created_at
      FROM devices
      WHERE id = ?
      LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  async findByCode(deviceCode) {
    const [rows] = await pool.query(
      `SELECT
        id,
        device_code,
        name,
        location_name,
        place_id,
        latitude,
        longitude,
        created_at
      FROM devices
      WHERE device_code = ?
      LIMIT 1`,
      [deviceCode]
    );
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO devices (device_code, name, location_name, place_id, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.device_code, data.name, data.location_name, data.place_id, data.latitude, data.longitude]
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error("Failed to retrieve created device");
    }
    return created;
  }
};
