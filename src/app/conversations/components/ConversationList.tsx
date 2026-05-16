"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import useConversation from "@/hooks/useConversation";
import { User } from "@prisma/client";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

// A better type for Conversation with populated users and messages
export type FullConversationType = any; // Will create proper type

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users 
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal 
        users={users} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
      <aside className={clsx(`
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Messages
            </div>
            <div 
              onClick={() => setIsModalOpen(true)}
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                dark:bg-zinc-800 
                text-gray-600 
                dark:text-gray-300 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <UserPlus size={20} />
            </div>
          </div>
          <div className="space-y-1">
            {items.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                key={item.id}
              >
                <ConversationBox
                  data={item}
                  selected={conversationId === item.id}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default ConversationList;
