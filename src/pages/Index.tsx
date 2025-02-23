
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

  const basePanelWidth = `calc((100vw - 120px) / ${panels.length})`;

  return (
    <div className="flex min-h-screen bg-black">
      {/* Persistent Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[120px] bg-black text-white z-30">
        <div className="h-full flex flex-col items-center">
          <div className="mt-6">
            <img
              src="/lovable-uploads/5b9c1c5c-e57b-48fe-baa2-a92391387130.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
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

      {/* Menu Panel */}
      <div 
        className="fixed left-[120px] w-[300px] h-full bg-black/90 z-20 transition-transform duration-300"
        style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <nav className="h-full flex items-center justify-center">
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
        className="fixed left-[120px] w-[calc(100vw-120px)] h-screen transition-transform duration-300"
        style={{ transform: isMenuOpen ? 'translateX(300px)' : 'translateX(0)' }}
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
        <div className="flex h-full relative z-10">
          {panels.map((panel, index) => (
            <div
              key={index}
              className="relative group cursor-pointer border-r border-white/20 last:border-r-0 flex-shrink-0"
              style={{ width: basePanelWidth }}
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <div className="transition-transform duration-300 transform group-hover:-translate-y-[150px]">
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
