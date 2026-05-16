"use client";

import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { useSocket } from "@/context/SocketContext";
import useConversation from "@/hooks/useConversation";

interface BodyProps {
  initialMessages: any[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages]);

  const { socket } = useSocket();
  const { conversationId } = useConversation();

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit('join-room', conversationId);

    const messageHandler = (message: any) => {
      setMessages((current) => {
        if (current.find((msg) => msg.id === message.id)) {
          return current;
        }

        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    socket.on('new-message', messageHandler);

    return () => {
      socket.off('new-message', messageHandler);
      socket.emit('leave-room', conversationId);
    }
  }, [socket, conversationId]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}

export default Body;
