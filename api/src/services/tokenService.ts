import jwt from "jsonwebtoken";
import { ErrorObject, } from "utility-belt-390";
import User from "../models/schemas/user";
import Token from "../models/schemas/token";
import { UserInterface, } from "../models/interfaces/userInterface";

class TokenService {

    static generateAccessToken(user: UserInterface): Promise<string> {
        // @ts-ignore
        return Promise.resolve(jwt.sign({
            "_id": user._id,
        }, process.env.AT_SECRET, { "expiresIn": process.env.AT_EXPIRES_IN, },),);
    }

    static generateRefreshToken(user: UserInterface): Promise<string> {
        // @ts-ignore
        return Promise.resolve(jwt.sign({
            "_id": user._id,
        }, process.env.RT_SECRET, { "expiresIn": process.env.RT_EXPIRES_IN, },),);
    }

    static async getUserFromAccessToken(accessToken: string,): Promise<UserInterface> {
        return this.getUserFromToken(accessToken, process.env.AT_SECRET,);
    }

    static async getUserFromRefreshToken(refreshToken: string,): Promise<UserInterface> {
        return this.getUserFromToken(refreshToken, process.env.RT_SECRET,);
    }

    private static async getUserFromToken(token: string, tokenSecret: string,): Promise<UserInterface> {
        const decoded = jwt.verify(token, tokenSecret,);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const user = await User.findOne({ _id: decoded._id, },);
        if (!user) throw new ErrorObject(404, "error", "User not found!",);
        return user;
    }

    static async refreshAccessToken(refreshToken: string,): Promise<string> {
        const user = await TokenService.getUserFromRefreshToken(refreshToken,);
        const token = await Token.findOneAndUpdate({ userId: user._id, "token.value": refreshToken, },
            { $set: { "token.$.lastSeen": Date.now(), }, },);
        if (!token) throw new ErrorObject(401, "error", "Refresh Token has expired",);
        return this.generateAccessToken(user);
    }

}

export default TokenService;
