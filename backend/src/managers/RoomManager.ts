import { User } from "./UserManager";

let GLOABL_ROOM_ID = 1;

interface Room{
    user1 : User,
    user2 : User
}

export class RoomManager{
    private rooms: Map<string,Room>

    constructor(){
        this.rooms = new Map<string,Room>()
    }
    createRoom(user1:User, user2 : User){
        const roomId = this.generate();
        this.rooms.set(roomId.toString(),{
            user1,user2
        })

            // user1 create a new room
        user1.socket.emit('send-offer',{
            roomId
        })
    }

    onOffer(roomId:string, sdp:string){
        const user2 = this.rooms.get(roomId)?.user2; 
        user2?.socket.emit('receive-offer',{
            sdp
        })
    }

    onAnswer(roomId:string, sdp:string){
        const user1 = this.rooms.get(roomId)?.user1; 
        user1?.socket.emit('return-ansewr',{
            sdp,
            roomId
        })
    }

  

    generate(){
        return GLOABL_ROOM_ID++;
    }
}