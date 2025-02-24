
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
          <Link to="/" className="text-[#5CC6D0] hover:text-white transition-colors">
            <div className="text-center font-serif italic">
              <div className="text-xl">Jamie</div>
              <div className="text-xl -mt-1">Marsland</div>
            </div>
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
