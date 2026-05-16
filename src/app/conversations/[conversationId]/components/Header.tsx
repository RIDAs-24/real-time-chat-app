"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import useOtherUser from "@/hooks/useOtherUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  conversation: any;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active"; // We will add real-time status later
  }, [conversation]);

  return (
    <>
      <div 
        className="
          bg-white 
          dark:bg-zinc-900 
          w-full 
          flex 
          border-b-[1px] 
          border-gray-200
          dark:border-zinc-800
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations" 
            className="
              lg:hidden 
              block 
              text-blue-500 
              hover:text-blue-600 
              transition 
              cursor-pointer
            "
          >
            <ChevronLeft size={32} />
          </Link>
          <Avatar>
            <AvatarImage src={conversation.isGroup ? conversation.groupAvatar : otherUser?.image} />
            <AvatarFallback>{conversation.isGroup ? "G" : otherUser?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              {conversation.name || otherUser?.name}
            </div>
            <div className="text-xs font-light text-neutral-500 dark:text-neutral-400">
              {statusText}
            </div>
          </div>
        </div>
        <MoreHorizontal 
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
            text-blue-500
            cursor-pointer
            hover:text-blue-600
            transition
          "
        />
      </div>
    </>
  );
}

export default Header;
