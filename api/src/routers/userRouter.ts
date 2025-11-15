import * as express from "express";
import { UtilityService, } from "utility-belt-390";
import UserController from "../controllers/userController";
import AuthenticationMiddleware from "../middleware/Authentication";

const router = express.Router();

const { catchAsync, } = UtilityService;

router.get("/logged-in", AuthenticationMiddleware.check, catchAsync(UserController.getLoggedInUser,),);

export default router;
