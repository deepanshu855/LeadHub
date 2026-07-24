import { Router } from "express";
import {
  createLeadController,
  getLeadsController,
  statusUpdateController,
} from "../controllers/lead.controller.js";
import { leadValidationRules } from "../validator/lead.validation.js";
import { identifyAdmin } from "../middlewares/auth.middleware.js";

const leadRouter = Router();

leadRouter.post("/", leadValidationRules, createLeadController);
leadRouter.get("/", identifyAdmin, getLeadsController);
leadRouter.patch("/:id/status", identifyAdmin, statusUpdateController);

export default leadRouter;
