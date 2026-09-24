import { readingsRepository } from "./readings.repository.js";
import { devicesRepository } from "../devices/devices.repository.js";
import { httpErrors } from "../../utils/response.js";
import { generateUUIDv7 } from "../../utils/uuid.js";

export const readingsService = {
  async getLatestAll() {
    return await readingsRepository.findLatestAll();
  },

  async recordReading(dto) {
    const device = await devicesRepository.findByCode(dto.device_code);
    if (!device) {
      throw httpErrors.notFound("Device not found");
    }

    const id = generateUUIDv7();
    const createReadingDTO = {
      id,
      deviceId: device.id,
      pm25: dto.pm25,
      temperature: dto.temperature,
      humidity: dto.humidity
    };

    return await readingsRepository.create(createReadingDTO);
  }
};
