import { Router } from "express";
import { identifyAdmin } from "../middlewares/auth.middleware.js";
import {
  loginAdminController,
  registerAdminController,
} from "../controllers/auth.controller.js";
import { authValidationRules } from "../validator/auth.validation.js";

const adminRouter = Router();

adminRouter.post("/login", authValidationRules, loginAdminController);
adminRouter.post("/register", authValidationRules, registerAdminController);

export default adminRouter;
