import { Menu } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1592656094267-764a45160876",
  },
  {
    title: "FANS",
    subtitle: "Vosotros y yo",
    image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece",
  },
  {
    title: "SHOP",
    subtitle: "Tienda oficial",
    image: "https://images.unsplash.com/photo-1542144582-7e5d5ca7b122",
  },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const defaultImage = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0";

  return (
    <div className="flex min-h-screen bg-black">
      <div
        className={`fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-48" : "w-0"
        }`}
      >
        <div className="p-6">
          <div className="mb-12">
            <img
              src="/placeholder.svg"
              alt="Logo"
              className="w-12 h-12 invert"
            />
          </div>

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

          <div className="mt-12">
            <div className="text-sm font-medium text-gray-400 mb-4">
              SPONSORS
            </div>
            <div className="flex gap-4 text-sm mt-8">
              <button className="text-cyan-400">ES</button>
              <button className="text-gray-400">EN</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "ml-48" : "ml-0"}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-6 left-6 z-50 text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div
          className="fixed inset-0 bg-cover bg-center transition-[background-image] duration-300"
          style={{
            backgroundImage: `url(${
              hoveredPanel !== null ? panels[hoveredPanel].image : defaultImage
            })`,
            marginLeft: isSidebarOpen ? "192px" : "0",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="flex h-screen relative z-10">
          {panels.map((panel, index) => (
            <div
              key={index}
              className="flex-1 relative group cursor-pointer border-r border-white/20 last:border-r-0"
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
            >
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
