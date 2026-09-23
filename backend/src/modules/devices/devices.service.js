import { devicesRepository } from "./devices.repository.js";
import { generateUUIDv7 } from "../../utils/uuid.js";
import { httpErrors } from "../../utils/response.js";

export const devicesService = {
  async getAllDevices() {
    return await devicesRepository.findAll();
  },

  async createDevice(dto) {

    const existing = await devicesRepository.findByCode(dto.device_code);
    if (existing) {
      throw httpErrors.conflict(`Device code '${dto.device_code}' already exists`);
    }

    const id = generateUUIDv7();
    return await devicesRepository.create({ id, ...dto });
  }
};
