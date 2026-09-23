import { devicesService } from "./devices.service.js";
import { validateCreateDeviceDTO } from "./devices.dto.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const devicesController = {
  async getAll(req, res) {
    try {
      const devices = await devicesService.getAllDevices();
      return sendSuccess(res, { data: devices });
    } catch (error) {
      return sendError(res, error);
    }
  },

  async create(req, res) {
    try {
      const dto = validateCreateDeviceDTO(req.body);
      const newDevice = await devicesService.createDevice(dto);
      return sendSuccess(res, { data: newDevice, statusCode: 201 });
    } catch (error) {
      return sendError(res, error);
    }
  }
};
