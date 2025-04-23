import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { menuItems, menuPaths } from "@/data/panels";

interface NavigationMenuProps {
  isMenuOpen: boolean;
  menuItems?: string[];
  menuPaths?: string[];
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
}

const NavigationMenu = ({ 
  isMenuOpen,
  menuItems: propMenuItems = menuItems,
  menuPaths: propMenuPaths = menuPaths,
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}: NavigationMenuProps) => {
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen && navRef.current) {
      const focusableElements = navRef.current.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

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
          {propMenuItems.map((item, index) => (
            <li key={index} className="flex justify-center">
              {propMenuPaths[index].startsWith('#') ? (
                <Link
                  to="/"
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave()}
                  onFocus={() => setHoveredMenuItem(index)}
                  onBlur={() => setHoveredMenuItem(null)}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  to={propMenuPaths[index]}
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave()}
                  onFocus={() => setHoveredMenuItem(index)}
                  onBlur={() => setHoveredMenuItem(null)}
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
