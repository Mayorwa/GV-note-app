import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import { NoteSummaryInterface, } from "../interfaces/noteSummaryInterface";

const NoteSummarySchema: Schema = new Schema({
    noteId: {
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: true,
    },
    summary: {
        type: String,
        required: [true, "summary is required",],
    },
}, { toJSON: { virtuals: true, }, toObject: { virtuals: true, }, timestamps: true, },);

NoteSummarySchema.methods = {
    toJSON(): Record<string, unknown> {
        const noteObject = this.toObject();
        return _.pick(noteObject,
            [
                "_id", "noteId", "summary", "createdAt", "updatedAt",
            ],);
    },
};

const useDbOptions = {
    useCache: true,
    noListener: true,
};
const db = mongoose.connection.useDb(process.env.DATABASE_NAME, useDbOptions,);
export default db.model<NoteSummaryInterface>("NoteSummary", NoteSummarySchema,);
