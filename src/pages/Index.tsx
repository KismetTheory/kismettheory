import { Menu, X } from "lucide-react";
import { useState } from "react";

const panels = [
  {
    title: "SKETCHES",
    subtitle: "Mi actualidad",
    image: "/lovable-uploads/4bb2b978-de5c-4a35-8880-467438168f2a.png",
  },
  {
    title: "ABOUT",
    subtitle: "Todo sobre mí",
    image: "https://images.unsplash.com/photo-1531315396756-905d68d21b56",
  },
  {
    title: "QUOTES",
    subtitle: "Citando lo aprendido",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831",
  },
  {
    title: "FANS",
    subtitle: "Vosotros y yo",
    image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece",
  },
  {
    title: "SHOP",
    subtitle: "Tienda oficial",
    image: "https://images.unsplash.com/photo-1542144612-1b3641ec3459",
  },
];

const menuItems = ["Sketches", "About", "Quotes", "Fans", "Rafa Nadal Shop"];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const defaultImage = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-black" role="main">
      {/* Persistent Left Sidebar - Hidden on Mobile */}
      <aside className="fixed left-0 top-0 h-full w-[120px] bg-black text-white z-30 hidden md:block" role="complementary" aria-label="Sidebar navigation">
        <div className="h-full flex flex-col items-center">
          <div className="mt-6">
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
            <div className="text-sm font-bold mb-4" id="sponsors-label">SPONSORS</div>
            <div className="flex gap-4" role="group" aria-labelledby="sponsors-label">
              <button className="text-[#5CC6D0]" aria-label="Switch to Spanish">ES</button>
              <button className="text-white opacity-50 hover:opacity-100" aria-label="Switch to English">EN</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black text-white z-40 flex items-center justify-between px-4 md:hidden" role="banner">
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

      {/* Menu Panel */}
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
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[1.8rem] leading-none font-extrabold text-white hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
                  onMouseEnter={() => setHoveredMenuItem(index)}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onFocus={() => setHoveredMenuItem(index)}
                  onBlur={() => setHoveredMenuItem(null)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content Container */}
      <main 
        className={`fixed w-full md:w-[calc(100vw-120px)] h-screen transition-transform duration-300 overflow-y-auto md:overflow-hidden ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:left-[120px]'
        }`}
        role="region"
        aria-label="Main content"
      >
        {/* Background Image */}
        <div className="absolute inset-0 md:fixed overflow-hidden" aria-hidden="true">
          {/* Default Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${defaultImage})`,
              opacity: hoveredPanel === null && hoveredMenuItem === null ? 1 : 0,
              transition: 'opacity 0.7s ease-in',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Hovered Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                hoveredMenuItem !== null 
                  ? panels[hoveredMenuItem].image 
                  : hoveredPanel !== null 
                    ? panels[hoveredPanel].image 
                    : defaultImage
              })`,
              opacity: (hoveredMenuItem !== null || hoveredPanel !== null) ? 1 : 0,
              transition: 'opacity 0.7s ease-in',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Panels Container */}
        <div className="flex flex-col md:flex-row h-full relative z-10 pt-16 md:pt-0">
          {panels.map((panel, index) => (
            <article
              key={index}
              className="relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/20 last:border-b-0 md:last:border-r-0 flex-shrink-0 h-[calc(100vh-4rem)] md:h-screen w-full md:w-[calc((100vw-120px)/5)]"
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
              onFocus={() => setHoveredPanel(index)}
              onBlur={() => setHoveredPanel(null)}
              tabIndex={0}
              role="button"
              aria-label={`${panel.title} - ${panel.subtitle}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center md:hidden"
                style={{
                  backgroundImage: `url(${panel.image})`,
                }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <div className="transition-transform duration-300 transform group-hover:-translate-y-[50px] min-h-[120px] flex flex-col items-start">
                  <div className="mt-auto">
                    <h2 className="text-2xl font-bold mb-2 whitespace-nowrap">{panel.title}</h2>
                    <p className="text-sm opacity-80">{panel.subtitle}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
