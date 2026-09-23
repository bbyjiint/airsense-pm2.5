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
      ORDER BY created_at ASC`
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

  async create({ id, device_code, name, location_name, place_id, latitude, longitude }) {
    await pool.query(
      `INSERT INTO devices (id, device_code, name, location_name, place_id, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, device_code, name, location_name, place_id, latitude, longitude]
    );

    const created = await this.findById(id);
    if (!created) {
      throw new Error("Failed to retrieve created device");
    }
    return created;
  }
};
