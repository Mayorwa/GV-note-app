import * as express from "express";
import { UtilityService, } from "utility-belt-390";
import NoteController from "../controllers/noteController";
import Authentication from "../middleware/Authentication";

const router = express.Router({ mergeParams: true, },);

const { catchAsync, } = UtilityService;

router.post("/create-note", Authentication.check, catchAsync(NoteController.createNote,),);

router.get("/", Authentication.check, catchAsync(NoteController.getAllUsersNote,),);

router.get("/:id", Authentication.check, catchAsync(NoteController.getNoteDetails,),);
router.put("/:id", Authentication.check, catchAsync(NoteController.updateNote,),);
router.delete("/:id", Authentication.check, catchAsync(NoteController.deleteNote,),);
export default router;
