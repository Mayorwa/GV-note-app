import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import { AuditLogInterface, } from "../interfaces/auditLogInterface";

const AuditLogSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Note",
        required: true,
        index: true,
    },
    action: {
        type: String,
        required: true,
        enum: ["created", "updated", "deleted",],
    },
    meta: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},);

AuditLogSchema.methods = {
    toJSON(): object {
        const object = this.toObject();
        return _.pick(object,
            ["_id", "actor", "organization", "department", "course", "featureType", "featureId", "parentType", "parentId",
                "parentPath", "parentTitle", "action","message", "createdAt",],);
    },
};

const db = mongoose.connection.useDb("tert-me",);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default db.model<AuditLogInterface>("AuditLog", AuditLogSchema,);