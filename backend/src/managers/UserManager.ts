import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";


export interface User{
    socket : Socket;
    name:string;
}

export class userManager{
    private users : User[];
    private queue : string[];
    private roomManager :RoomManager;
    constructor(){
        this.users = [];
        this.queue = []
        this.roomManager = new RoomManager();
    }
    addUser(name:string, socket:Socket){
        this.users.push({
            name, socket
        })
        this.queue.push(socket.id);
        this.clearQueue();
        this.initHandlers(socket);
    }
   
    removeUser(socketId:string){
        this.users = this.users.filter((id)=>id.socket.id === socketId)
    }

    clearQueue(){
        if(this.queue.length < 2){
            return ;
        }
        const user1 = this.users.find((id)=>id.socket.id !== this.queue.pop());
        const user2 = this.users.find((id)=>id.socket.id === this.queue.pop());

        if(!user1 || !user2){
            return;
        }

        const room = this.roomManager.createRoom(user1,user2);
        this.clearQueue();
      
    }


    initHandlers(socket:Socket){
        socket.on('Offer', ({sdp,roomId}:{sdp:string,roomId:string})=>{
            this.roomManager.onOffer(roomId, sdp)
        })
        
        socket.on('answer', ({sdp,roomId}:{sdp:string,roomId:string})=>{
            this.roomManager.onAnswer(roomId, sdp)
        })
    }

}