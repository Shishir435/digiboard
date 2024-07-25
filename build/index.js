"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const uuid_1 = require("uuid");
const port = parseInt(process.env.PORT || "3000");
const dev = process.env.NODE_ENV !== "production";
const nextApp = (0, next_1.default)({ dev });
const nextHandler = nextApp.getRequestHandler();
const socket_io_1 = require("socket.io");
nextApp.prepare().then(async () => {
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server);
    app.get("/health", async (_, res) => {
        res.send("I'm healthy");
    });
    const rooms = new Map();
    const addMove = (roomId, socketId, move) => {
        var _a, _b, _c, _d;
        const room = rooms.get(roomId);
        if (!((_a = room === null || room === void 0 ? void 0 : room.users) === null || _a === void 0 ? void 0 : _a.has(socketId))) {
            (_b = room === null || room === void 0 ? void 0 : room.usersMoves) === null || _b === void 0 ? void 0 : _b.set(socketId, [move]);
        }
        (_d = (_c = room === null || room === void 0 ? void 0 : room.usersMoves) === null || _c === void 0 ? void 0 : _c.get(socketId)) === null || _d === void 0 ? void 0 : _d.push(move);
    };
    const undoMove = (roomId, socketId) => {
        var _a, _b;
        const room = rooms.get(roomId);
        (_b = (_a = room === null || room === void 0 ? void 0 : room.usersMoves) === null || _a === void 0 ? void 0 : _a.get(socketId)) === null || _b === void 0 ? void 0 : _b.pop();
    };
    io.on("connection", (socket) => {
        const getRoomId = () => {
            const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);
            if (!joinedRoom)
                return socket.id;
            return joinedRoom;
        };
        console.log("connected to server");
        const leaveRoom = (roomId, socketId) => {
            const room = rooms.get(roomId);
            if (!room)
                return;
            const userMoves = room === null || room === void 0 ? void 0 : room.usersMoves.get(socketId);
            if (userMoves)
                room === null || room === void 0 ? void 0 : room.drawed.push(...userMoves);
            room === null || room === void 0 ? void 0 : room.users.delete(socketId);
            socket.leave(roomId);
        };
        socket.on("create_room", (userName) => {
            let roomId;
            // generate random id
            do {
                roomId = Math.random().toString(36).substring(2, 6);
            } while (rooms.has(roomId));
            socket.join(roomId);
            rooms.set(roomId, {
                users: new Map([[socket.id, userName]]),
                drawed: [],
                usersMoves: new Map([[socket.id, []]]),
            });
            io.to(socket.id).emit("created", roomId);
        });
        socket.on("check_room", (roomId) => {
            if (rooms.has(roomId)) {
                socket.emit("room_exists", true);
            }
            else {
                socket.emit("room_exists", false);
            }
        });
        socket.on("join_room", (roomId, userName) => {
            const room = rooms.get(roomId);
            if (room && room.users.size < 12) {
                socket.join(roomId);
                room.users.set(socket.id, userName);
                room.usersMoves.set(socket.id, []);
                io.to(socket.id).emit("joined", roomId);
            }
            else {
                // failed to join the room failed==true
                io.to(socket.id).emit("joined", "", true);
            }
        });
        socket.on("joined_room", () => {
            const roomId = getRoomId();
            console.log(roomId, "joined room");
            const room = rooms.get(roomId);
            if (!room)
                return;
            io.to(socket.id).emit("room", room, JSON.stringify([...room.usersMoves]), JSON.stringify([...room === null || room === void 0 ? void 0 : room.users]));
            socket.broadcast
                .to(roomId)
                .emit("new_user", socket.id, room.users.get(socket.id) || "Anonymous");
        });
        socket.on("leave_room", () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);
            io.to(roomId).emit("user_disconnected", socket.id);
        });
        socket.on("draw", (move) => {
            const roomId = getRoomId();
            console.log(roomId, "drawing");
            const timestamps = Date.now();
            move.id = (0, uuid_1.v4)();
            const newMove = Object.assign(Object.assign({}, move), { timestamps });
            addMove(roomId, socket.id, newMove);
            io.to(socket.id).emit("your_move", newMove);
            socket.broadcast.to(roomId).emit("user_draw", newMove, socket.id);
        });
        socket.on("undo", () => {
            const roomId = getRoomId();
            console.log(roomId, "undo");
            undoMove(roomId, socket.id);
            socket.broadcast.to(roomId).emit("user_undo", socket.id);
        });
        socket.on("send_msg", (msg) => {
            io.to(getRoomId()).emit("new_msg", socket.id, msg);
        });
        socket.on("mouse_move", (x, y) => {
            const roomId = getRoomId();
            socket.broadcast.to(roomId).emit("mouse_moved", x, y, socket.id);
        });
        socket.on("disconnecting", () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);
            io.to(roomId).emit("user_disconnected", socket.id);
            console.log("disconnected from server");
        });
    });
    app.all("*", (req, res) => nextHandler(req, res));
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
