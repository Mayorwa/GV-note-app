import { Types, Document, } from "mongoose";

export interface AuditLogInterface extends Document {
    organization: Types.ObjectId;
    department: Types.ObjectId;
    course: Types.ObjectId;
    action: string;
    featureType: string;
    featureId: Types.ObjectId;
    parentId: Types.ObjectId;
    parentType: string;
    parentPath: string;
    parentTitle: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
}