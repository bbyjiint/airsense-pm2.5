import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrate() {
  console.log("🚀 Running database migration...");
  try {
    const schemaPath = path.resolve(__dirname, "../schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");

    // รัน schema ทีละคำสั่ง (แยกด้วย ;)
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      await pool.query(statement);
    }

    console.log("✅ Database schema migrated successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrate();
