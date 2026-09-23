import { httpErrors } from "../../utils/response.js";

export function validateCreateReadingDTO(body = {}) {
  const {
    device_code,
    pm25,
    temperature,
    humidity
  } = body;

  const errors = [];

  if (!device_code || typeof device_code !== "string" || !device_code.trim()) {
    errors.push("device_code is required");
  }

  if (pm25 === undefined || pm25 === null || typeof pm25 !== "number" || isNaN(pm25)) {
    errors.push("pm25 is required and must be a number");
  }

  if (temperature === undefined || temperature === null || typeof temperature !== "number" || isNaN(temperature)) {
    errors.push("temperature is required and must be a number");
  }

  if (humidity === undefined || humidity === null || typeof humidity !== "number" || isNaN(humidity)) {
    errors.push("humidity is required and must be a number");
  }

  if (errors.length > 0) {
    throw httpErrors.badRequest("device_code, pm25, temperature and humidity are required", errors);
  }

  return {
    device_code: device_code.trim(),
    pm25: Number(pm25),
    temperature: Number(temperature),
    humidity: Number(humidity)
  };
}
