import "dotenv/config";
import mysql from "mysql2/promise";

const poolConfig = process.env.DATABASE_URL
  ? { uri: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "airsense_db",
      waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS !== "false",
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
      maxIdle: Number(process.env.DB_MAX_IDLE) || 10,
      idleTimeout: Number(process.env.DB_IDLE_TIMEOUT) || 60000,
      queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    };

const pool = mysql.createPool(poolConfig);

export default pool;
