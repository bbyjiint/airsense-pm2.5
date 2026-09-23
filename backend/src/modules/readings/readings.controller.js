import { readingsService } from "./readings.service.js";
import { validateCreateReadingDTO } from "./readings.dto.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const readingsController = {
  async getLatestAll(req, res) {
    try {
      const readings = await readingsService.getLatestAll();
      return sendSuccess(res, { data: readings });
    } catch (error) {
      return sendError(res, error);
    }
  },

  async create(req, res) {
    try {
      const dto = validateCreateReadingDTO(req.body);
      const reading = await readingsService.recordReading(dto);
      return sendSuccess(res, {
        message: "Reading added successfully",
        data: reading,
        statusCode: 201
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
};
