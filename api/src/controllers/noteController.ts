import { Response, Request } from "express";
import { UtilityService, } from "utility-belt-390";
import NoteService from "../services/noteService";
import { AuthenticatedReq, } from "../models/interfaces/authenticatedReq";

class NoteController {
    static async createNote(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { body, user, } = req;

        const mustBePresent = {
            title: "title cannot be left blank",
            languageCode: "languageCode cannot be left blank",
            content: "content cannot be left blank",
        };

        UtilityService.validateInput(body, mustBePresent,);

        const data = await NoteService.createNote(user._id, body,);

        await NoteService.summarise(data._id);

        return res.status(200,).send({ status: "success", message: "Note Created successfully", data, },);
    }

    static async getNoteDetails(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { params, user, } = req;

        const data = await NoteService.getNote(params.id,);

        return res.status(200,).send({ status: "success", message: "Note Details Retrieved successfully", data, },);
    }

    static async getAllUsersNote(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { query, user } = req;

        const limit = 8;
        const { page = 1 } = query;
        const [notes, pagination] = await NoteService.getAllUsersNote(user._id, limit, parseInt(String(page), 10));

        const data = { data: notes, meta: pagination, }
        return res.status(200,).send({ status: "success", message: "Notes retrieved successfully", data, },);
    }

    static async updateNote(req: Request, res: Response,): Promise<void> {
        const { params, body, } = req;

        const note = await NoteService.updateNote(body, params.id,);

        res.status(200,).send({ status: "success", message: "Note updated successfully", data: note, },);
    }

    static async deleteNote(req: Request, res: Response,): Promise<void> {
        const { params, } = req;

        await NoteService.deleteNote(params.id,);

        res.status(200,).send({ status: "success", message: "Note deleted successfully", },);
    }
}

export default NoteController;
