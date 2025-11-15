import appRoot from "app-root-path";
import expressWinston from "express-winston";
import winston from "winston";

const date = new Date().toISOString();
const day = date.split("T",)[0];
const option = {
    file: {
        level: "info",
        filename: `${appRoot}/logs/${day}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        colorize: false,
    },
    errorFile: {
        level: "error",
        filename: `${appRoot}/logs/${day}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        colorize: false,
    },
};

expressWinston.requestWhitelist.push("body",);
expressWinston.bodyBlacklist.push("password",);

const errorLoggerInProd = expressWinston.errorLogger({
    transports: [new winston.transports.File(option.file,),],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
},);

const errorLog = expressWinston.errorLogger({
    transports: [new winston.transports.File(option.file,),
        new winston.transports.Console(),],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
},);

export const logger = expressWinston.logger({
    transports: [new winston.transports.File(option.file,),
        new winston.transports.Console(),],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
    colorize: true,
},);

export const appLogger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File(option.file,),
    ],
    exitOnError: false, // do not exit on handled exceptions
},);

const nodeEnv = process.env.NODE_ENV;

export const errorLogger = nodeEnv === "development" || nodeEnv === "staging" ? errorLog : errorLoggerInProd;
