import mongoose from "mongoose";

mongoose.Promise = global.Promise;

let uri = process.env.DATABASE_LOCAL;
/*let uri = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
);*/
uri = uri.replace("<dbname>", process.env.DATABASE_NAME,);
// @ts-ignore
mongoose.connect(uri,);

const db = mongoose.connection.once("open", () => {
    console.log("MongoDb connection created successfully!",);
},).on("error", err => {
    console.log("MongoDB connection error:", err);
},);

export default db;
