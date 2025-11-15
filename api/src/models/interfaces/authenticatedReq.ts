import { Request, } from "express";
import { UserInterface, } from "./userInterface";

export interface AuthenticatedReq extends Request {
    user: UserInterface;
}
