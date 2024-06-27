import {createServer} from "http"

import express from "express"

import next, {NextApiHandler} from "next"

const port=parseInt(process.env.PORT || "3000")
const dev=process.env.NODE_ENV !=="production"

const nextApp=next({dev})
const nextHandler:NextApiHandler=nextApp.getRequestHandler()

import {Server} from "socket.io"
import type { ClientToServerEvents,ServerToClientEvents } from "@/common/types/types"


nextApp.prepare().then(async ()=>{
    const app=express()
    const server=createServer(app) 

    const io= new Server<ClientToServerEvents,ServerToClientEvents>(server)

    app.get("/health",async (_,res)=>{
        res.send("I'm healthy")
    })

    io.on("connection",(socket)=>{
        console.log("connection")

        socket.join("global")

        const allUsers=io.sockets.adapter.rooms.get("global")
        if(allUsers) io.emit("users_in_room",[...allUsers])

        socket.on("draw",(moves,option)=>{
            console.log("drawing")
            socket.broadcast.emit("socket_draw",moves,option)
        })

        socket.on("mouse_move",(x,y)=>{
            console.log("mouse_move",x,y)
            socket.broadcast.emit("mouse_moved",x,y,socket.id)
        })

        socket.on("disconnect",()=>{
            console.log("client disconnected")
        })
    })

    app.all("*",(req:any,res:any)=>nextHandler(req,res))

    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`)
    })
})
