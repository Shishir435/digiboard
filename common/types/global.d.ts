export declare global {
    export interface CtxOptions {
        lineWidth: number,
        lineColor: string,
    }
    export interface Move {
        path: [number,number][],
        options: CtxOptions
    }

    export interface ClientRoom {
        id: string;
        users: Map<string,string>;
        usersMoves: Map<string,Move[]>;
        movesWithoutUser: Move[];
        myMoves: Move[];
    }

    export type Room={usersMoves:Map<string,Move[]>,drawed:Move[],users: Map<string,string>};
    export interface ServerToClientEvents {
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
    }
}