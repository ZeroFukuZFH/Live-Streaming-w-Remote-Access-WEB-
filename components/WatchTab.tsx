import { ChatRoomContext } from "./custom hooks/useChat";
import useChat, { ChatHookProps } from "./custom hooks/useChat";
import MemberDisplay from "./MemberDisplay";
import { ChatRoom } from "./ChatRoom";

export function WatchTab({ link }: { link: string }) {
  const { send, chats }: ChatHookProps = useChat();

  return (
    <ChatRoomContext.Provider value={{ send, chats }}>
      <div>
        <div className="flex flex-row w-screen max-w-7xl h-screen max-h-[660]">
          <div className="p-6 w-full h-full flex flex-row gap-4">
            <iframe
              src={link.length <= 0 ? undefined : link}
              sandbox="allow-forms allow-scripts allow-same-origin"
              width="100%"
              height="600"
              allowFullScreen
            />
            <ChatRoom />
          </div>
        </div>
        <MemberDisplay />
      </div>
    </ChatRoomContext.Provider>
  );
}