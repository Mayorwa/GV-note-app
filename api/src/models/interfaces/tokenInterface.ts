import mongoose, { Document, } from "mongoose";

export interface TokenInterface extends Document {
    userId: mongoose.Types.ObjectId;
    token: any;
    createdAt: Date;
    updatedAt: Date;
}
