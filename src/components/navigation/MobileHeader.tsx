
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileHeader = ({ isMenuOpen, toggleMenu }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background text-foreground z-40 flex items-center justify-between px-4 md:hidden">
      <Link 
        to="/"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
      >
        <div className="text-center dark:text-[#5CC6D0] dark:hover:text-white text-black hover:text-[#5CC6D0] transition-colors">
          <div className="text-lg font-sans">Kismet</div>
          <div className="text-lg font-sans">Theory</div>
        </div>
      </Link>
      <button
        onClick={toggleMenu}
        className="dark:text-[#5CC6D0] dark:hover:text-white text-black hover:text-[#5CC6D0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X className="w-8 h-8" aria-hidden="true" /> : <Menu className="w-8 h-8" aria-hidden="true" />}
      </button>
    </header>
  );
};

export default MobileHeader;
