
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavigationMenuProps {
  isMenuOpen: boolean;
}

const NavigationMenu = ({ isMenuOpen }: NavigationMenuProps) => {
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const menuItems = ["Journal", "Iphone", "Quotes", "Fans", "Rafa Nadal Shop"];
  const menuPaths = ["/photo-journal", "#iphone", "#quotes", "#fans", "#shop"];

  return (
    <nav 
      id="main-menu"
      className={`fixed w-full md:w-[300px] h-full bg-black/90 z-20 transition-all duration-300 ${
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
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
                  onMouseEnter={() => setHoveredMenuItem(index)}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onFocus={() => setHoveredMenuItem(index)}
                  onBlur={() => setHoveredMenuItem(null)}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  to={menuPaths[index]}
                  className="text-[1.8rem] leading-none font-extrabold dark:text-white dark:hover:text-[#5CC6D0] text-black hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
                  onMouseEnter={() => setHoveredMenuItem(index)}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onFocus={() => setHoveredMenuItem(index)}
                  onBlur={() => setHoveredMenuItem(null)}
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
