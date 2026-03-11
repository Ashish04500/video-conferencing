import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import {connectTosocket} from './controllers/socketmanger.js';

const app=express();
const server=createServer(app);
const io=connectTosocket(server);
app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
const start=async()=>{
    const connectdb=await mongoose.connect("mongodb+srv://ashish1010:ashish2645@cluster0.epiqwdy.mongodb.net/")
    console.log(`MONGO connected db host:${connectdb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    });
}

start();