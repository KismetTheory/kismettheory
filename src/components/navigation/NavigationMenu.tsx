
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface NavigationMenuProps {
  isMenuOpen: boolean;
  menuItems: string[];
  menuPaths: string[];
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const NavigationMenu = ({ isMenuOpen, menuItems, menuPaths, onMouseEnter, onMouseLeave }: NavigationMenuProps) => {
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Handle tab focus - when menu closes, move focus out of the menu
  useEffect(() => {
    if (!isMenuOpen && navRef.current) {
      // Find all focusable elements in the menu
      const focusableElements = navRef.current.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // When menu closes, blur any focused element within the menu
      const focused = document.activeElement;
      if (focused && Array.from(focusableElements).includes(focused as Element)) {
        (focused as HTMLElement).blur();
      }
    }
  }, [isMenuOpen]);

  return (
    <nav 
      id="main-menu"
      ref={navRef}
      className={`fixed w-full md:w-[300px] h-full dark:bg-black/90 bg-white/90 z-20 transition-all duration-300 ${
        isMenuOpen 
          ? 'left-0 md:left-[120px]' 
          : '-left-full md:left-[-300px]'
      }`}
      role="navigation"
      aria-label="Main navigation"
      aria-hidden={!isMenuOpen}
    >
      <div className="h-full flex items-center justify-center pt-16 md:pt-0">
        <ul className="space-y-6 w-full px-12">
          {menuItems.map((item, index) => (
            <li key={index} className="flex justify-center">
              {menuPaths[index].startsWith('#') ? (
                <Link
                  to="/"
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  onMouseEnter={() => {
                    setHoveredMenuItem(index);
                    onMouseEnter(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredMenuItem(null);
                    onMouseLeave();
                  }}
                  onFocus={() => {
                    setHoveredMenuItem(index);
                    onMouseEnter(index);
                  }}
                  onBlur={() => {
                    setHoveredMenuItem(null);
                    onMouseLeave();
                  }}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  to={menuPaths[index]}
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  onMouseEnter={() => {
                    setHoveredMenuItem(index);
                    onMouseEnter(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredMenuItem(null);
                    onMouseLeave();
                  }}
                  onFocus={() => {
                    setHoveredMenuItem(index);
                    onMouseEnter(index);
                  }}
                  onBlur={() => {
                    setHoveredMenuItem(null);
                    onMouseLeave();
                  }}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
