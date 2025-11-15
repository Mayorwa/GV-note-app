import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development" || nodeEnv === "test") {
    dotenv.config({ path: `./config/${nodeEnv}.env`, },);
}

import express, {
    Application, Request, Response, NextFunction,
} from "express";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { ErrorObject, } from "utility-belt-390";
import { logger, } from "./services/logger";

import "./db";

const app: Application = express();

const appVersion = process.env.APP_VERSION;

import routes from "./routes";

app.use(express.json({ limit: "2mb", },),);
app.use(express.urlencoded({ extended: false, },),);

const whitelist = ['http://themayowa.custom:5173', 'http://themayowa.custom:5173/', 'http://127.0.0.1:5173/']
const corsOptions = {
    origin: whitelist,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(logger,);
app.use(cors(corsOptions));
app.use(mongoSanitize(),);

/*
app.use((req: Request, res: Response, next: NextFunction,) => {
    const allowedOrigins = ["http://localhost:5173/", "http://127.0.0.1:5173/", "http://themayowa.custom:5173/"];
    // @ts-ignore
    const { origin } = req.headers || "";

    if (!origin || (Array.isArray(origin,))) {
        return next(new ErrorObject(401, "error", "Origin not found",),);
    }

    if (allowedOrigins.indexOf(origin,) > -1) {
        res.setHeader("Access-Control-Allow-Origin", origin,);

        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS",);
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, pin",);
        res.setHeader("Access-Control-Allow-Credentials", "true",);

        return next();
    }

    return next(new ErrorObject(401, "error", "What are you doing here",),);
},);
*/

// Routes to endpoints
routes(app, appVersion,);

export default app;
