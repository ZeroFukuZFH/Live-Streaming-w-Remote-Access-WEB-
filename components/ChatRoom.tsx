"use client"

import { CornerDownLeft, User } from "lucide-react"
import { useState, KeyboardEvent } from "react"


export function ChatRoom(){ 
  return (
    <div className="bg-[rgb(255,255,255,0.15)] h-screen max-h-[600] max-w-80 flex flex-col rounded-xl p-2 pl-4 pr-4 backdrop-blur-xs border-red">
      <ChatHeader/>
      <ChatArea/>
      <ChatBox/>
    </div>
  )
}

const sampleClient = {
    name:"Richie"
};

interface ChatProps {
  id : number,
  name : string, 
  message : string
}

const sampleChats : ChatProps[] = []

function ChatHeader() {
  const [members, setMembers] = useState(0);
  return (
    <div className="flex justify-between pt-2 pb-2 ">
      <h1>Live Chat</h1>
      <div className="flex gap-2">
        <User scale={10}/> 
        {members}
      </div>
    </div>
  );
}

function ChatArea(){
  return (
    <div className="border-t border-b pt-2 pb-2 h-full">
      {sampleChats.map(user => (
        <div key={user.id}>
          {
            user.name == sampleClient.name ? 
            <div className="flex flex-col items-end">
              <p className="text-sm">You</p>
              <p className="bg-red-600 pt-2 pb-2 pl-4 pr-4 max-w-fit rounded-2xl">
                {user.message}
              </p>
            </div> :
            <div className="flex flex-col">
              <p className="text-sm">{user.name}</p>
              <p className="bg-[rgb(25,25,25)] pt-2 pb-2 pl-4 pr-4 max-w-fit rounded-2xl">
                {user.message}
              </p>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

function ChatBox(){
  const handleEnter = (event : KeyboardEvent<HTMLInputElement>) => {
    if(event.key == 'Enter') {
      console.log("Key Pressed!" + event.key)
    }
  }
  return (
    <div className="flex gap-2 pt-2 pb-2">
      <input 
        className="border rounded-xl p-2 w-full focus:bg-white focus:text-black outline-none" 
        placeholder="start typing..." 
        onKeyDown={handleEnter}
      />
      <button className="bg-red-600 p-2 rounded-xl"><CornerDownLeft/></button>
    </div>
  )
}
