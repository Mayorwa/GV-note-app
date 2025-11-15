import {
    Application, NextFunction, Request, Response,
} from "express";
import { ErrorObject, errorHandler, } from "utility-belt-390";
import { errorLogger, } from "./services/logger";
import authRouter from "./routers/authRouter";
import noteRouter from "./routers/noteRouter";
import userRouter from "./routers/userRouter";
import defaultRouter from "./routers/defaultRouter";

export default (application: Application, appVersion: string,): void => {
    application.use(`${appVersion}/`, defaultRouter,);
    application.use(`${appVersion}/auth`, authRouter,);
    application.use(`${appVersion}/note`, noteRouter,);
    application.use(`${appVersion}/user`, userRouter,);

    application.use((req: Request, res: Response, next: NextFunction,) => {
        next(new ErrorObject(404, "fail", `Can't find ${req.originalUrl} on this server!`,),);
    },);
    application.use(errorLogger,);
    application.use(errorHandler,);
};
