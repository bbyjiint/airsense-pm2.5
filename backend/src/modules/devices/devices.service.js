import { devicesRepository } from "./devices.repository.js";

export const devicesService = {
  async getAllDevices() {
    return await devicesRepository.findAll();
  },

  async createDevice(dto) {
    return await devicesRepository.create(dto);
  }
};
