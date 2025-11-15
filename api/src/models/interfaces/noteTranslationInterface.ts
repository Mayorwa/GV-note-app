import { Types, Document, } from "mongoose";

export interface NoteTranslationInterface extends Document {
    noteId: Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
