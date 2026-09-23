import { readingsRepository } from "./readings.repository.js";
import { devicesRepository } from "../devices/devices.repository.js";
import { httpErrors } from "../../utils/response.js";

export const readingsService = {
  async getLatestAll() {
    return await readingsRepository.findLatestAll();
  },

  async recordReading(dto) {
    const device = await devicesRepository.findByCode(dto.device_code);
    if (!device) {
      throw httpErrors.notFound("Device not found");
    }

    return await readingsRepository.create(device.id, dto);
  }
};
