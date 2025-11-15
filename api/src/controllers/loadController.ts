import { Response, Request } from "express";
import { UtilityService, } from "utility-belt-390";
import NoteService from "../services/noteService";
import TranslationService from "../services/translationService";
import { AuthenticatedReq, } from "../models/interfaces/authenticatedReq";

class LoadController {
    static async summarise(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { body, } = req;

        const mustBePresent = {
            noteId: "NoteId cannot be left blank",
        };

        UtilityService.validateInput(body, mustBePresent,);

        const data = await NoteService.summarise(body.noteId,);

        return res.status(200,).send({ status: "success", message: "Note Summary retrieved successfully", data, },);
    }

    static async translate(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { body, } = req;

        const mustBePresent = {
            noteId: "NoteId cannot be left blank",
            targetLanguageCode: "targetLanguageCode cannot be left blank",
        };

        UtilityService.validateInput(body, mustBePresent,);

        const data = await TranslationService.translate(body.noteId, body.targetLanguageCode);

        return res.status(200,).send({ status: "success", message: "Translation created successfully", data, },);
    }
}

export default LoadController;
