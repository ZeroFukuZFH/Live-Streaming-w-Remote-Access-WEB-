import { ChatRoom } from "@/components/ChatRoom";
import MemberDisplay from "@/components/MemberDisplay";

export default function Page() {
  return (
    <div>
      <div className="flex flex-row w-screen max-w-7xl h-screen max-h-[660]">
        <div className="p-6 w-full h-full flex flex-row gap-4">
        
          <iframe 
            src="https://www.vidking.net/embed/tv/119051/1/8?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true" width="100%" height="600" allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin"
          /> 
          <ChatRoom/>    
        </div>
      
      </div>
      <MemberDisplay/>
    </div>
  );
}