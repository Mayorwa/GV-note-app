import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import { NoteInterface, } from "../interfaces/noteInterface";

const NoteSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "title is required",],
    },
    content: {
        type: String,
        required: [true, "content is required",],
    },
    languageCode: {
        type: String,
        enum: ["en", "fr", "de", "it"],
    },
}, { toJSON: { virtuals: true, }, toObject: { virtuals: true, }, timestamps: true, },);

NoteSchema.methods = {
    toJSON(): Record<string, unknown> {
        const noteObject = this.toObject();
        return _.pick(noteObject,
            [
                "_id", "userId", "title", "content", "languageCode", "createdAt", "updatedAt",
            ],);
    },
};

const useDbOptions = {
    useCache: true,
    noListener: true,
};

const db = mongoose.connection.useDb(process.env.DATABASE_NAME, useDbOptions,);
export default db.model<NoteInterface>("Note", NoteSchema,);
