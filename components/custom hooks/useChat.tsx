
import { useState, useEffect, createContext } from "react";
import { Socket, io } from "socket.io-client";

export const ChatRoomContext = createContext<ChatHookProps>({
  send: (message: string, name:string) => {},
  chats: [],
})

export interface ChatHookProps {
    send: (message: string, name:string) => void
    chats: ChatProps[]
}

export interface ChatProps {
    id: string;
    name: string;
    message: string;
}

export default function useChat() {
  const [sock, setSock] = useState<Socket>();
  const [chats, setChats] = useState<ChatProps[]>([]);
 
  useEffect(() => {
    const getSock = async () => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        auth: { 
            token: "some secret key" 
        },
        });

        socket.on("connect", () => console.log("Connected!", socket.id));

        socket.on("recieve_message", (data: { name: string; message: string }) => {
            setChats((prev) => [...prev, { 
                id: Date.now().toString()
                ,...data 
            }]);
        });

        setSock(socket);

        return () => {
        socket.disconnect();
        }
    }
    getSock()
  }, []);

  const send = (message: string,name:string) => {
    if (!sock?.connected) return;
    sock.emit("send_message", { 
        message:message,
        name: name 
    });

    setChats((prev) => 
        [...prev, { 
            id: Date.now().toString(), 
            name: name, 
            message:message 
        }
    ]);
  };
  return { send, chats};
}