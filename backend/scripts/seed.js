import pool from "../src/db.js";
import { generateUUIDv7 } from "../src/utils/uuid.js";

async function runSeed() {
  console.log("🌱 Running database seed...");
  try {
    // 1. ตัวอย่าง Devices
    const devices = [
      {
        id: generateUUIDv7(),
        device_code: "DEV-BANGKOK-001",
        name: "Siam Square Air Station",
        location_name: "Siam Paragon, Bangkok",
        place_id: "ChIJb8rR3o-e4jAR9Z95hPzF2fE",
        latitude: 13.74663,
        longitude: 100.53485
      },
      {
        id: generateUUIDv7(),
        device_code: "DEV-BANGKOK-002",
        name: "Ari Sensor Node",
        location_name: "Phahon Yothin Soi 7, Bangkok",
        place_id: "ChIJr14fD2Ce4jARqY5k7B8Ewwc",
        latitude: 13.77978,
        longitude: 100.54483
      },
      {
        id: generateUUIDv7(),
        device_code: "DEV-CHIANGMAI-001",
        name: "Nimman Air Monitor",
        location_name: "Nimmanahaeminda Rd, Chiang Mai",
        place_id: "ChIJO-L3F3Z82TAR9U5h9B8Ewwd",
        latitude: 18.79614,
        longitude: 98.96746
      }
    ];

    for (const dev of devices) {
      await pool.query(
        `INSERT INTO devices (id, device_code, name, location_name, place_id, latitude, longitude)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), location_name = VALUES(location_name)`,
        [
          dev.id,
          dev.device_code,
          dev.name,
          dev.location_name,
          dev.place_id,
          dev.latitude,
          dev.longitude
        ]
      );
    }
    console.log(`✅ Seeded ${devices.length} devices.`);

    // ดึง devices id จาก device_code เพื่อใส่ readings
    const [rows] = await pool.query(
      `SELECT id, device_code FROM devices WHERE device_code IN (?, ?, ?)`,
      devices.map((d) => d.device_code)
    );

    const devMap = new Map(rows.map((r) => [r.device_code, r.id]));

    // 2. ตัวอย่าง Readings
    const readings = [
      // DEV-BANGKOK-001
      {
        id: generateUUIDv7(),
        device_id: devMap.get("DEV-BANGKOK-001"),
        pm25: 35.5,
        temperature: 31.2,
        humidity: 65.0
      },
      {
        id: generateUUIDv7(),
        device_id: devMap.get("DEV-BANGKOK-001"),
        pm25: 38.2,
        temperature: 32.0,
        humidity: 62.5
      },
      // DEV-BANGKOK-002
      {
        id: generateUUIDv7(),
        device_id: devMap.get("DEV-BANGKOK-002"),
        pm25: 22.8,
        temperature: 30.5,
        humidity: 70.1
      },
      // DEV-CHIANGMAI-001
      {
        id: generateUUIDv7(),
        device_id: devMap.get("DEV-CHIANGMAI-001"),
        pm25: 58.4,
        temperature: 28.0,
        humidity: 55.4
      }
    ];

    for (const r of readings) {
      if (r.device_id) {
        await pool.query(
          `INSERT INTO readings (id, device_id, pm25, temperature, humidity)
           VALUES (?, ?, ?, ?, ?)`,
          [r.id, r.device_id, r.pm25, r.temperature, r.humidity]
        );
      }
    }
    console.log(`✅ Seeded ${readings.length} readings.`);
    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeed();
