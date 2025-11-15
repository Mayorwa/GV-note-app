import { Types, } from "mongoose";
import { ErrorObject, UtilityService, } from "utility-belt-390";
import { NoteInterface, DetailedNoteInterface } from "../models/interfaces/noteInterface";
import Note from "../models/schemas/note";
import NoteSummary from "../models/schemas/noteSummary";
import NoteTranslation from "../models/schemas/noteTranslation";
import {NoteSummaryInterface} from "../models/interfaces/noteSummaryInterface";
import {NoteTranslationInterface} from "../models/interfaces/noteTranslationInterface";

class NoteService {
    static async createNote(userId: Types.ObjectId, body: Record<string, string>,): Promise<NoteInterface> {

        const noteParams = {
            userId: userId,
            title: body.title,
            languageCode: body.languageCode,
            content: body.content,
        };

        const note = await this.createNoteDocument(userId, noteParams,);

        return this.validateIfNoteExist(note._id,);
    }

    // get all notes
    static async getAllUsersNote(userId: Types.ObjectId, limit: number, page: number): Promise<[NoteInterface[], any]> {
        const notes = await Note.find({ userId,  },).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 }).lean<NoteInterface[]>();

        const count = await Note.countDocuments();
        const meta = {
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            pageCount: limit,
        }
        return [notes, meta];
    }

    // get single note
    static async getNote(noteId: Types.ObjectId,): Promise<DetailedNoteInterface> {
        const note = await this.validateIfNoteExist(noteId);
        const summary = await NoteSummary.findOne({ noteId }).sort({ createdAt: -1 }).lean<NoteSummaryInterface>();
        const translations = await NoteTranslation.find({ noteId }).sort({ createdAt: -1 }).lean<NoteTranslationInterface[]>();
        // @ts-ignore
        return {
            ...note,
            summary,
            translations
        };
    }

    // edit note
    static async updateNote(body: any, noteId: Types.ObjectId,): Promise<any> {
        await this.validateIfNoteExist(noteId,);

        await this.updateNoteDocument(noteId, body,);

        return this.validateIfNoteExist(noteId,);
    }

    // delete note
    static async deleteNote(noteId: Types.ObjectId,): Promise<void> {
        await this.validateIfNoteExist(noteId,);

        await this.deleteNoteDocument(noteId,);
    }

    static async summarise(noteId: string) {
        const note = await this.validateIfNoteExist(noteId,);
        if (!note) throw new ErrorObject(404, "error", "Note not found");

        const content = note.content || "";
        const summary = content.split(".")[0].trim() + ".";

        let newSummary = await NoteSummary.findOne({ noteId });
        if (newSummary){
            newSummary.summary = summary
        }else{
            newSummary = new NoteSummary({
                noteId,
                summary
            });
        }
        newSummary.save();
        return this.getLatestSummary(noteId);
    }

    static async getLatestSummary(noteId: string) {
        return NoteSummary.findOne({ noteId })
            .lean<NoteSummaryInterface>();
    }

    static async validateIfNoteExist(noteId: Types.ObjectId,): Promise<NoteInterface> {
        const note = await Note.findById(noteId,).lean<NoteInterface>();

        if (!note) throw new ErrorObject(404, "error", "Note not found!",);

        return note;
    }

    private static async createNoteDocument(userId: Types.ObjectId, body: Record<string, any>,): Promise<NoteInterface> {
        return Note.create({
            userId: userId,
            title: body.title,
            languageCode: body.languageCode,
            content: body.content,
        },);
    }

    private static async updateNoteDocument(noteId: Types.ObjectId, update: any,): Promise<void> {
        await Note.updateOne({ _id: noteId, }, update, { new: true, },);
    }

    private static async deleteNoteDocument(noteId: Types.ObjectId,): Promise<void> {
        await Note.deleteOne({ _id: noteId, },);
    }
}

export default NoteService;
