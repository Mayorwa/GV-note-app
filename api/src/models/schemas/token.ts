import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import { TokenInterface, } from "../interfaces/tokenInterface";

const TokenSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    token: [{
        value: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        lastSeen: {
            type: Date,
            required: true,
            unique: true,
            trim: true,
        },
    },],
},{ toJSON: { virtuals: true, }, toObject: { virtuals: true, }, timestamps: true, },);

TokenSchema.methods = {
    toJSON(): { [type: string]: unknown } {
        const tokenObject = this.toObject();
        return _.pick(tokenObject,
            ["_id", "userId", "token", "createdAt", "updatedAt",],);
    },
};

const useDbOptions = {
    useCache: true,
    noListener: true,
};
const db = mongoose.connection.useDb(process.env.DATABASE_NAME, useDbOptions,);
export default db.model<TokenInterface>("Token", TokenSchema,);
