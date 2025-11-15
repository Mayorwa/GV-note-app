import { Types, Document, } from "mongoose";

export interface NoteSummaryInterface extends Document {
    noteId: Types.ObjectId;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
}
