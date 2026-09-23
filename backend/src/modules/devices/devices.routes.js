import express from "express";
import { devicesController } from "./devices.controller.js";

const router = express.Router();

router.get("/", devicesController.getAll);
router.post("/", devicesController.create);

export default router;
