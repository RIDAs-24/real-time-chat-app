import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ 
  label, 
  icon: Icon, 
  href, 
  onClick, 
  active 
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <li onClick={handleClick} className="w-full flex justify-center">
      <Link 
        href={href} 
        className={clsx(`
            group 
            flex 
            gap-x-3 
            rounded-2xl 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            dark:text-zinc-400
            hover:text-black 
            dark:hover:text-white
            hover:bg-gray-100 
            dark:hover:bg-zinc-800/50
            transition-all
          `,
          active && "bg-gray-100 dark:bg-zinc-800/80 text-black dark:text-white"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
   );
}
 
export default DesktopItem;
