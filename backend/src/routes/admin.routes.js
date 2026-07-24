import { Router } from "express";
import { identifyAdmin } from "../middlewares/auth.middleware.js";
import {
  getMeController,
  loginAdminController,
  logoutController,
  registerAdminController,
} from "../controllers/auth.controller.js";
import { authValidationRules } from "../validator/auth.validation.js";

const adminRouter = Router();

adminRouter.post("/login", authValidationRules, loginAdminController);
adminRouter.post("/register", authValidationRules, registerAdminController);
adminRouter.get("/get-me", identifyAdmin, getMeController);
adminRouter.get("/logout", logoutController);

export default adminRouter;
