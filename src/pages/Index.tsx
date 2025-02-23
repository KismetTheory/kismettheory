
import { Menu } from "lucide-react";
import { useState } from "react";

const panels = [
  {
    title: "DAY TO DAY",
    subtitle: "Mi actualidad en imágenes",
    defaultImage: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8",
    hoverImage: "https://images.unsplash.com/photo-1622279457989-5c5c1c9b5dc3",
  },
  {
    title: "ABOUT",
    subtitle: "Todo sobre mí",
    defaultImage: "https://images.unsplash.com/photo-1546404477-d5c9d204aef4",
    hoverImage: "https://images.unsplash.com/photo-1531315396756-905d68d21b56",
  },
  {
    title: "QUOTES",
    subtitle: "Citando lo aprendido",
    defaultImage: "https://images.unsplash.com/photo-1625823007435-6b7c8c1e6787",
    hoverImage: "https://images.unsplash.com/photo-1622279457989-5c5c1c9b5dc3",
  },
  {
    title: "FANS",
    subtitle: "Vosotros y yo",
    defaultImage: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc",
    hoverImage: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653",
  },
  {
    title: "SHOP",
    subtitle: "Tienda oficial",
    defaultImage: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
    hoverImage: "https://images.unsplash.com/photo-1576618148191-0f31a3d3f379",
  },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="mb-12">
            <img
              src="/placeholder.svg"
              alt="Logo"
              className="w-12 h-12 invert"
            />
          </div>

          {/* Menu Items */}
          <nav className="space-y-6">
            <div className="text-sm font-medium text-gray-400">MENU</div>
            <div className="space-y-4">
              {["HOME", "ABOUT", "NEWS", "CONTACT"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          {/* Sponsors Section */}
          <div className="mt-12">
            <div className="text-sm font-medium text-gray-400 mb-4">
              SPONSORS
            </div>
            {/* Language Toggle */}
            <div className="flex gap-4 text-sm mt-8">
              <button className="text-cyan-400">ES</button>
              <button className="text-gray-400">EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-[256px]" : "ml-0"}`}>
        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-6 left-6 z-50 text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Vertical Panels */}
        <div className="flex h-screen">
          {panels.map((panel, index) => (
            <div
              key={index}
              className="flex-1 relative group cursor-pointer transition-all duration-500"
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${
                    hoveredPanel === index ? panel.hoverImage : panel.defaultImage
                  })`,
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">{panel.title}</h2>
                <p className="text-sm opacity-80">{panel.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
