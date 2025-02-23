
import { Menu, X } from "lucide-react";
import { useState } from "react";

const panels = [
  {
    title: "DAY TO DAY",
    subtitle: "Mi actualidad en imágenes",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
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

const menuItems = ["Day To Day", "About", "Quotes", "Fans", "Rafa Nadal Shop"];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const defaultImage = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0";

  return (
    <div className="flex min-h-screen bg-black">
      {/* Persistent Left Sidebar - Hidden on Mobile */}
      <div className="fixed left-0 top-0 h-full w-[120px] bg-black text-white z-30 hidden md:block">
        <div className="h-full flex flex-col items-center">
          <div className="mt-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#5CC6D0]"
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5CC6D0] hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <>
                <span className="block text-sm mb-2 text-center">MENU</span>
                <Menu className="w-8 h-8" />
              </>
            )}
          </button>
          <div className="absolute bottom-8 text-white">
            <div className="text-sm font-bold mb-4">SPONSORS</div>
            <div className="flex gap-4">
              <button className="text-[#5CC6D0]">ES</button>
              <button className="text-white opacity-50 hover:opacity-100">EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full h-16 bg-black text-white z-40 flex items-center justify-between px-4 md:hidden">
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#5CC6D0]"
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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#5CC6D0] hover:text-white transition-colors"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Menu Panel */}
      <div 
        className={`fixed w-full md:w-[300px] h-full bg-black/90 z-20 transition-all duration-300 ${
          isMenuOpen 
            ? 'left-0 md:left-[120px]' 
            : '-left-full md:left-[-300px]'
        }`}
      >
        <nav className="h-full flex items-center justify-center pt-16 md:pt-0">
          <div className="space-y-6 w-full px-12">
            {menuItems.map((item, index) => (
              <div key={index} className="flex justify-center">
                <a
                  href="#"
                  className="text-[1.8rem] leading-none font-extrabold text-white hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
                >
                  {item}
                </a>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Container */}
      <div 
        className={`fixed w-full md:w-[calc(100vw-120px)] h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:left-[120px]'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Default Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${defaultImage})`,
              opacity: hoveredPanel === null ? 1 : 0,
              transition: 'opacity 0.7s ease-in',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Hovered Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hoveredPanel !== null ? panels[hoveredPanel].image : defaultImage})`,
              opacity: hoveredPanel !== null ? 1 : 0,
              transition: 'opacity 0.7s ease-in',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Panels Container */}
        <div className="flex flex-col md:flex-row h-full relative z-10 pt-16 md:pt-0">
          {panels.map((panel, index) => (
            <div
              key={index}
              className="relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/20 last:border-b-0 md:last:border-r-0 flex-shrink-0 h-[calc(100vh-4rem)] md:h-full w-full md:w-[calc((100vw-120px)/5)]"
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <div className="transition-transform duration-300 transform group-hover:-translate-y-[50px]">
                  <h2 className="text-2xl font-bold mb-2">{panel.title}</h2>
                  <p className="text-sm opacity-80">{panel.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
