import * as crypt from "bcryptjs";
import { ErrorObject, UtilityService, } from "utility-belt-390";
import User from "../models/schemas/user";
import { UserInterface, } from "../models/interfaces/userInterface";


class UserService {
    static async checkIfUserExistsAndIsVerified(options: any, verificationMethod: string,): Promise<UserInterface> {
        const user = await User.findOne(options,);
        if (user && user[verificationMethod]) {
            const errors = {};
            Object.keys(options,).forEach((opt,) => { errors[opt] = `${opt} has been taken`; },);
            throw new ErrorObject(400, "fail", "Validation Error", errors,);
        }
        return user;
    }

    static async findByCredentials(inputEmail: string, password: string,): Promise<UserInterface> {
        const email = inputEmail.toLowerCase();
        const user = await User.findOne({ email, },).select("+password",);
        if (!user) throw new ErrorObject(400, "error", "Sorry, your login credentials aren't correct",);
        const result = await crypt.compare(password, user.password,);
        if (!result) throw new ErrorObject(400, "error", "Sorry, your login credentials aren't correct",);
        return user;
    }

}

export default UserService;