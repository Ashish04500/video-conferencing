import express from 'express';
import {createServer} from 'node:http';
import mongoose from 'mongoose';
import cors from 'cors';
import {connectTosocket} from './controllers/socketmanger.js';
import userRoutes from './route/users.route.js';
import dotenv from "dotenv";
dotenv.config();

const app=express();
const server=createServer(app);
const io=connectTosocket(server);
app.set("port",(process.env.PORT || 8000));
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);
const start = async () => {
    try {
        const connectdb = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO connected db host:${connectdb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.log("Error starting server:", error);
    }
};

start();