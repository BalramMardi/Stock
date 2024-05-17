import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/AuthController.js";

import { requireSignIn } from "../middlewares/AuthMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//Forgot Password
router.post("/forgot-password", forgotPasswordController);

//test Routes
router.get("/test", requireSignIn, testController);

//protected Routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
