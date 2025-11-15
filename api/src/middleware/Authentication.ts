import { Request, Response, NextFunction, } from "express";
import { ErrorObject, } from "utility-belt-390";
import TokenService from "../services/tokenService";

class Authentication {

    static async check(req: any, res: Response, next: NextFunction,): Promise<void> {
        try {
            const { user, token, } = await Authentication.checkUser(req,);
            req.user = user;
            req.token = token;
            return next();
        } catch (err) {
            if (err instanceof ErrorObject) return next(err,);
            return next(new ErrorObject(419, "error", "cannot authenticate user",),);
        }

    }

    static async checkUser(req: Request,): Promise<{ user; token }> {

        if (!req.header("authorization",)) {
            throw new ErrorObject(400, "error", "authorization header not found",);
        }
        const tokenWithBearer = req.header("authorization",);
        const token = tokenWithBearer.substring(7, tokenWithBearer.length,);
        try {
            const user = await TokenService.getUserFromAccessToken(token,);
            return { user, token, };
        } catch (err) {
            throw new ErrorObject(419, "error", "cannot authenticate user: Invalid token or Token has expired",);
        }

    }

}

export default Authentication;
