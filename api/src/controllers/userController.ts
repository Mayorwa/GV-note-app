import { Response, } from "express";
import { AuthenticatedReq, } from "../models/interfaces/authenticatedReq";

class UserController {

    static async getLoggedInUser(req: AuthenticatedReq, res: Response,): Promise<Response> {
        const { user, } = req;
        return res.status(200,).send({ status: "success", message: "User retrieved successfully", data: user, },);
    }

}

export default UserController;
