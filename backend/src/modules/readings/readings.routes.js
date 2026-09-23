import express from "express";
import { readingsController } from "./readings.controller.js";

const router = express.Router();

router.get("/latest-all", readingsController.getLatestAll);
router.post("/", readingsController.create);

export default router;
