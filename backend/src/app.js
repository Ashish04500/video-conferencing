import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

const app=express();
const server=createServer(app);
const io=new Server(server);
app.set("port",(process.env.PORT || 8000));
app.get('/home',(req,res)=>{
    return res.json({"hello":"world"})
});

const start=async()=>{
    const connectdb=await mongoose.connect("mongodb+srv://ashish1010:<ashish@2645>@cluster0.epiqwdy.mongodb.net/")
    console.log("MONGO connected db host:${connectdb.connection.host}");
    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    });
}

start();