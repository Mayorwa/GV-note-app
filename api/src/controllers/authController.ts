import { Request, Response, } from "express";
import { UtilityService, } from "utility-belt-390";
import AuthService from "../services/authService";
import TokenService from "../services/tokenService";

class AuthController {

    static async register(req: Request, res: Response,): Promise<Response> {
        const { body, } = req;
        const mustBePresent = {
            fullName: "Full name must be present",
            email: "Email must be present",
            password: "Password is required",
            confirmPassword: "Confirm password is required",
        };
        UtilityService.validateInput(req.body, mustBePresent,);
        const data = await AuthService.register(body,);
        return res.status(200,).send({
            status: "success",
            message: "Account created successfully",
            data,
        },);
    }

    static async login(req: Request, res: Response,): Promise<void> {
        const { body, } = req;
        const mustBePresent = {
            email: "Email must be present",
            password: "Password must be present",
        };
        UtilityService.validateInput(body, mustBePresent,);
        const data = await AuthService.login(body.email, body.password,);
        res.header("token", data.accessToken,).status(200,).send({ status: "success", message: "Login successful", data, },);
    }

    static async logout(req: Request, res: Response,): Promise<void> {
        const { body, } = req;
        const mustBePresent = { refreshToken: "Refresh Token not present", };

        UtilityService.validateInput(body, mustBePresent,);
        await AuthService.logout(body.refreshToken,);

        res.status(200,).send({ status: "success", message: "Logout successful", data: null, },);
    }

    static async refreshToken(req: Request, res: Response,): Promise<Response> {
        const mustBePresent = { refreshToken: "Refresh Token must be present", };
        UtilityService.validateInput(req.body, mustBePresent,);
        const accessToken = await TokenService.refreshAccessToken(req.body.refreshToken,);
        return res.header("token", accessToken,).status(200,).send({ accessToken, },);
    }
}

export default AuthController;
