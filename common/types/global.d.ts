export declare global {
    export interface CtxOptions {
        lineWidth: number,
        lineColor: string,
    }
    export interface Move {
        path: [number,number][],
        options: CtxOptions
    }

    export type Room=Map<string,Move[]>
    export interface ServerToClientEvents {
        joined: (room:string)=>void;
        user_draw: (move:Move,userId:string) => void;
        mouse_moved: (x:number,y:number,socketId:string)=>void;
        users_in_room: (socketIds: string[])=>void;
        user_disconnected: (socketId: string)=>void;
        user_undo: (userId:string)=>void;
    }
    
    export interface ClientToServerEvents {
        draw: (move: Move) => void;
        mouse_move: (x:number,y:number)=>void;
        undo: ()=>void;
    }
}