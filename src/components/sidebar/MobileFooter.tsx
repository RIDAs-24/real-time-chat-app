"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { ThemeToggle } from "../theme-toggle";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return ( 
    <div 
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white/80 
        dark:bg-zinc-950/80
        border-t-[1px] 
        border-zinc-200
        dark:border-zinc-800
        lg:hidden
        backdrop-blur-xl
        pb-safe
      "
    >
      {routes.map((route) => (
        <MobileItem 
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
      <div className="p-4 flex items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
   );
}
 
export default MobileFooter;
