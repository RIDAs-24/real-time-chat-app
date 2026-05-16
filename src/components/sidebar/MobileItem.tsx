import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ 
  href, 
  icon: Icon, 
  active, 
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <Link 
      onClick={handleClick} 
      href={href} 
      className={clsx(`
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        dark:text-zinc-400
        hover:text-black 
        dark:hover:text-white
        hover:bg-gray-100
        dark:hover:bg-zinc-800/50
        transition-all
      `,
        active && "bg-gray-100 dark:bg-zinc-800/80 text-black dark:text-white",
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
   );
}
 
export default MobileItem;
