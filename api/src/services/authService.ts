import jwt from "jsonwebtoken";
import { ErrorObject, UtilityService, } from "utility-belt-390";
import UserService from "./userService";
import TokenService from "./tokenService";
import User from "../models/schemas/user";
import Token from "../models/schemas/token";
import { UserInterface, } from "../models/interfaces/userInterface";

class AuthService {

    static async register(body: any,): Promise<any> {
        const {
            email, password, confirmPassword, fullName
        } = body;

        // Make validation checks
        const errors: { [key: string]: string } = {};
        if (password.length < 6) errors.password = "password must be more than 6 characters";
        if (password !== confirmPassword) errors.confirmPassword = "passwords do not match";
        if (email && !UtilityService.validateEmail(email,)) errors.email = "Email format is wrong";
        if (Object.keys(errors,).length > 0) throw new ErrorObject(400, "fail", "Input validation error", errors,);

        // Check that a verified user has not taken this email
        let user = await UserService.checkIfUserExistsAndIsVerified({ email, }, "isEmailVerified",);


        if (!user) {
            user = new User({
                fullName,
                password,
                email,
            },);
        }

        await user.save();

        return this.login(email, password,);
    }

    static async login(email: string, password: string,): Promise<{ user: UserInterface; accessToken: string; refreshToken: string }> {
        const user = await UserService.findByCredentials(email, password,);

        const accessToken = await TokenService.generateAccessToken(user);
        const refreshToken = await TokenService.generateRefreshToken(user);

        await Token.updateOne({ userId: user._id, }, {
            $push: { token: { value: refreshToken, lastSeen: Date.now(), }, },
        }, { upsert: true, },);
        return { user, accessToken, refreshToken, };
    }

    static async logout(refreshToken: string,): Promise<any> {
        const decoded: any = jwt.verify(refreshToken, process.env.RT_SECRET,);
        const id = decoded._id;
        const response = await Token.findOneAndUpdate({ userId: id, },
            { $pull: { token: { value: refreshToken, }, }, },
            { new: true, },);
        if (response && Object.keys(response.token,).length === 0) await Token.deleteOne({ userId: id, },);

    }
}

export default AuthService;
