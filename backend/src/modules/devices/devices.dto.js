import { httpErrors } from "../../utils/response.js";

export function validateCreateDeviceDTO(body = {}) {
  const {
    device_code,
    name,
    location_name = null,
    place_id = null,
    latitude,
    longitude
  } = body;

  const errors = [];

  if (!device_code || typeof device_code !== "string" || !device_code.trim()) {
    errors.push("device_code is required");
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("name is required");
  }

  if (latitude === undefined || latitude === null || typeof latitude !== "number" || isNaN(latitude)) {
    errors.push("latitude is required and must be a valid number");
  }

  if (longitude === undefined || longitude === null || typeof longitude !== "number" || isNaN(longitude)) {
    errors.push("longitude is required and must be a valid number");
  }

  if (errors.length > 0) {
    throw httpErrors.badRequest("device_code, name, latitude and longitude are required", errors);
  }

  return {
    device_code: device_code.trim(),
    name: name.trim(),
    location_name: location_name ? String(location_name).trim() : null,
    place_id: place_id ? String(place_id).trim() : null,
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
}
