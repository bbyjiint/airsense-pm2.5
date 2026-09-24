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
    const createDeviceDTO = {
      id,
      device_code: dto.device_code,
      name: dto.name,
      location_name: dto.location_name,
      place_id: dto.place_id,
      latitude: dto.latitude,
      longitude: dto.longitude
    };

    return await devicesRepository.create(createDeviceDTO);
  }
};
