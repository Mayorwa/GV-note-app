import * as crypt from "bcryptjs";
import mongoose, { Schema, } from "mongoose";
import * as _ from "lodash";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import { UserInterface, } from "../interfaces/userInterface";

const UserSchema: Schema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank",],
        minlength: [6, "Password should be more than 5 characters.",],
        select: false,
    },
}, { toJSON: { virtuals: true, }, toObject: { virtuals: true, }, timestamps: true, },);

UserSchema.plugin(beautifyUnique, { defaultMessage: "{VALUE} has been taken.", },);

UserSchema.methods = {
    toJSON(): Record<string, unknown> {
        const userObject = this.toObject();
        return _.pick(userObject,
            [
                "_id", "fullName", "email", "createdAt", "updatedAt",
            ],);
    },
};

const useDbOptions = {
    useCache: true,
    noListener: true,
};

UserSchema.pre<UserInterface>("save", async function (next,) {
    if (this.isModified("password",)) {
        const salt = await crypt.genSalt(10,);
        this.password = await crypt.hash(this.password, salt,);
    }
    next();
},);

const db = mongoose.connection.useDb(process.env.DATABASE_NAME,useDbOptions,);
export default db.model<UserInterface>("User", UserSchema,);
