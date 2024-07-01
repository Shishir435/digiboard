export declare global {
    export type Shape = "line" | "circle" | "rectangle"

    export interface CtxOptions {
        lineWidth: number;
        lineColor: string;
        erase: boolean;
        shape: Shape;
    }
    export interface Move {
        shape: Shape;
        radius: number;
        width: number;
        height: number;
        path: [number,number][];
        options: CtxOptions;
        timestamps: number;
        eraser: boolean;
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

    export type Room={usersMoves:Map<string,Move[]>,drawed:Move[],users: Map<string,string>};
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