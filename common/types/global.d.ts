import { RgbaColor } from "react-colorful";

export declare global {
    export type Shape = "line" | "circle" | "rectangle" | "image";
    export type CtxMode="eraser" | "draw" | "select"
    export interface CtxOptions {
        lineWidth: number;
        lineColor: RgbaColor;
        fillColor: RgbaColor;
        shape: Shape;
        mode: CtxMode;
        selection: {x:number,y:number,width:number,height:number} | null
    }
    export interface Move {
        circle: {
            cX: number;
            cY: number;
            radiusX: number;
            radiusY: number;
        };
        rectangle: {
            width: number;
            height: number;
        };
        image: {
            base64: string;
        }
        path: [number,number][];
        options: CtxOptions;
        timestamps: number;
        id: string;
    }

    interface User {
        name: string;
        color: string;
    }

    interface Message {
        id: number;
        userId: string;
        userName: string;
        color: string;
        msg: string;
    }
    export interface ClientRoom {
        id: string;
        users: Map<string,User>;
        usersMoves: Map<string,Move[]>;
        movesWithoutUser: Move[];
        myMoves: Move[];
    }

    export type Room={
        usersMoves:Map<string,Move[]>;
        drawed:Move[];
        users: Map<string,string>
    };
    export interface ServerToClientEvents {
        your_move: (move:Move)=>void;
        new_msg: (userId:string,msg:string)=>void;
        room_exists: (exists:boolean)=>void;
        room: (room:Room,usersMovesToParse:string,usersToParse:string)=>void;
        created: (roomId:string)=>void;
        joined: (roomId:string,failed?:boolean)=>void;
        new_user: (userId:string,userName:string)=>void;
        user_draw: (move:Move,userId:string) => void;
        mouse_moved: (x:number,y:number,userId:string)=>void;
        user_disconnected: (userId: string)=>void;
        user_undo: (userId:string)=>void;
    }
    
    export interface ClientToServerEvents {
        check_room: (roomId:string)=>void;
        draw: (move: Move) => void;
        mouse_move: (x:number,y:number)=>void;
        undo: ()=>void;
        create_room: (userName:string)=>void;
        join_room: (room:string,userName:string)=>void;
        joined_room: ()=>void;
        leave_room: ()=>void;
        send_msg: (msg:string)=>void;
    }
}