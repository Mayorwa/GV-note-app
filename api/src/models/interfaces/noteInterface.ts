import { Types, Document, } from "mongoose";
import {NoteSummaryInterface} from "./noteSummaryInterface";
import {NoteTranslationInterface} from "./noteTranslationInterface";

export interface NoteInterface extends Document {
    userId: Types.ObjectId;
    title: string;
    content: string;
    languageCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DetailedNoteInterface extends NoteInterface{
    summary: NoteSummaryInterface;
    translations: NoteTranslationInterface[];
}
