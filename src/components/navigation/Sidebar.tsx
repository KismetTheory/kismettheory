
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({ isMenuOpen, toggleMenu }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[120px] bg-black text-white z-30 hidden md:block" role="complementary" aria-label="Sidebar navigation">
      <div className="h-full flex flex-col items-center">
        <div className="mt-6">
          <Link to="/">
            <svg
              width="48"
              height="48"
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
        </div>
        <button
          onClick={toggleMenu}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5CC6D0] hover:text-white transition-colors"
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" aria-hidden="true" />
          ) : (
            <>
              <span className="block text-sm mb-2 text-center">MENU</span>
              <Menu className="w-8 h-8" aria-hidden="true" />
            </>
          )}
        </button>
        <div className="absolute bottom-8 text-white">
          <div className="text-sm font-bold mb-4" id="sponsors-label">
            SPONSORS
          </div>
          <div
            className="flex gap-4"
            role="group"
            aria-labelledby="sponsors-label"
          >
            <button
              className="text-[#5CC6D0]"
              aria-label="Switch to Spanish"
            >
              ES
            </button>
            <button
              className="text-white opacity-50 hover:opacity-100"
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
