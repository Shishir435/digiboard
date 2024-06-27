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
        room: (room:string)=>void;
        created: (roomId:string)=>void;
        joined: (roomId:string,failed?:boolean)=>void;
        new_user: (userId:string)=>void;
        user_draw: (move:Move,userId:string) => void;
        mouse_moved: (x:number,y:number,userId:string)=>void;
        user_disconnected: (userId: string)=>void;
        user_undo: (userId:string)=>void;
    }
    
    export interface ClientToServerEvents {
        draw: (move: Move) => void;
        mouse_move: (x:number,y:number)=>void;
        undo: ()=>void;
        create_room: ()=>void;
        join_room: (room:string)=>void;
        joined_room: ()=>void;
        leave_room: ()=>void;
    }
}