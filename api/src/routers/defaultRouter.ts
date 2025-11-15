import * as express from "express";
import { UtilityService, } from "utility-belt-390";
import LoadController from "../controllers/loadController";
import Authentication from "../middleware/Authentication";

const router = express.Router({ mergeParams: true, },);

const { catchAsync, } = UtilityService;

router.post("/summarise", Authentication.check, catchAsync(LoadController.summarise,),);

router.post("/translate", Authentication.check, catchAsync(LoadController.translate,),);

export default router;
