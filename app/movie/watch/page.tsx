"use client"

import { ChatRoom } from "@/components/ChatRoom";
import MemberDisplay from "@/components/MemberDisplay";
import { MovieLinkContext } from "@/components/temporarySolution";
import { useContext } from "react";
import { HomeHeader } from "@/components/AppHeader";

export default function Page() {
  const {link} = useContext(MovieLinkContext)
  return (
    <div>
      <HomeHeader/>
      <div className="flex flex-row w-screen max-w-7xl h-screen max-h-[660]">
        <div className="p-6 w-full h-full flex flex-row gap-4">
        
          <iframe 
            src={link} width="100%" height="600" allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin"
          /> 
          <ChatRoom/>    
        </div>
      
      </div>
      <MemberDisplay/>
    </div>
  );
}