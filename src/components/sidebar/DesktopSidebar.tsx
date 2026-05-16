"use client";

import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import useRoutes from "@/hooks/useRoutes";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  currentUser: any; // Will type properly later
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal 
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white/80 
        lg:dark:bg-zinc-950/80
        lg:border-r-[1px]
        lg:border-zinc-200
        lg:dark:border-zinc-800
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        backdrop-blur-xl
      ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center space-y-4">
          <ThemeToggle />
          <div 
            onClick={() => setIsOpen(true)} 
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar>
              <AvatarImage src={currentUser?.image || ""} />
              <AvatarFallback>{currentUser?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </nav>
      </div>
    </>
  );
}

export default DesktopSidebar;
