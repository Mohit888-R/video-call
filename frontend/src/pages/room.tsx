
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const URL = "http://localhost:5001";

function Room() {

  const searchParams = useSearchParams();
    const name = searchParams.get('name');
  const [socket, setSocket] = useState<null| Socket>(null);

  useEffect(()=>{
      const socket = io(URL);
      socket.emit('send-offer', ({roomId}:{roomId:any})=>{
        alert("send Offer Please");
        socket.emit("offer", {
          sdp : "", 
          roomId
        })
      })

      socket.on('receive-offer', ({roomId, offer})=>{
        alert("send answer please");
        socket.emit("offer", {
          sdp : "", 
          roomId
        })
      })


      socket.on('answer', ({roomId, answer})=>{
        alert("connection done");
      })

      setSocket(socket);

  },[name])
  return (
    <div>
    hii {name}
    </div>
  )
}

export default Room
