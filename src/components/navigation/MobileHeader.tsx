
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileHeader = ({ isMenuOpen, toggleMenu }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-black text-white z-40 flex items-center justify-between px-4 md:hidden">
      <Link to="/">
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#5CC6D0]"
          role="img"
          aria-label="Logo"
        >
          <path
            d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 2c9.941 0 18 8.059 18 18s-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6z"
            fill="currentColor"
          />
          <path
            d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z"
            fill="currentColor"
          />
          <path
            d="M24 20c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z"
            fill="currentColor"
          />
        </svg>
      </Link>
      <button
        onClick={toggleMenu}
        className="text-[#5CC6D0] hover:text-white transition-colors"
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
