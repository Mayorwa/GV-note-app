import * as express from "express";
import { UtilityService, } from "utility-belt-390";
import AuthController from "../controllers/authController";

const router = express.Router();

const { catchAsync, } = UtilityService;

router.post("/register", catchAsync(AuthController.register,),);
router.post("/login", catchAsync(AuthController.login,),);
router.post("/logout", catchAsync(AuthController.logout,),);
router.post("/refresh-token", catchAsync(AuthController.refreshToken,),);
export default router;
