import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import { NoteTranslationInterface, } from "../interfaces/noteTranslationInterface";

const NoteTranslationSchema: Schema = new Schema({
    noteId: {
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: true,
    },
    targetLanguageCode: {
        type: String,
        enum: ["en", "fr", "de", "it"],
    },
    text: {
        type: String,
        required: [true, "content is required",],
    },
}, { toJSON: { virtuals: true, }, toObject: { virtuals: true, }, timestamps: true, },);

NoteTranslationSchema.methods = {
    toJSON(): Record<string, unknown> {
        const noteObject = this.toObject();
        return _.pick(noteObject,
            [
                "_id", "noteId", "targetLanguageCode", "text", "createdAt", "updatedAt",
            ],);
    },
};

const useDbOptions = {
    useCache: true,
    noListener: true,
};
const db = mongoose.connection.useDb(process.env.DATABASE_NAME, useDbOptions,);
export default db.model<NoteTranslationInterface>("NoteTranslation", NoteTranslationSchema,);
