
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface WordPressImage {
  id: number;
  date: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

const menuItems = ["Photo Journal", "About", "Quotes", "Fans", "Rafa Nadal Shop"];
const menuPaths = ["/photo-journal", "#about", "#quotes", "#fans", "#shop"];

const PhotoJournal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);

  const { data: posts, error } = useQuery({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      // Updated to filter for the "photos" category (ID: 5)
      const response = await fetch(
        "https://jamiemarsland.co.uk/wp-json/wp/v2/posts?_embed&categories=5"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsLoading(false);
      console.log('WordPress API response:', data); // Debug log
      return data as WordPressImage[];
    },
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainContent = (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Photo Journal</h1>
        
        {error ? (
          <p className="text-red-500">Error loading photos. Please try again later.</p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => {
              const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;

              if (!imageUrl) return null;

              return (
                <div key={post.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-medium">{post.title.rendered}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black">
      {/* Persistent Left Sidebar - Hidden on Mobile */}
      <aside className="fixed left-0 top-0 h-full w-[120px] bg-black text-white z-30 hidden md:block">
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
            <div className="text-sm font-bold mb-4" id="sponsors-label">SPONSORS</div>
            <div className="flex gap-4" role="group" aria-labelledby="sponsors-label">
              <button className="text-[#5CC6D0]" aria-label="Switch to Spanish">ES</button>
              <button className="text-white opacity-50 hover:opacity-100" aria-label="Switch to English">EN</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black text-white z-40 flex items-center justify-between px-4 md:hidden">
        <Link to="/">
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
        </Link>
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
                {menuPaths[index].startsWith('#') ? (
                  <Link
                    to="/"
                    className="text-[1.8rem] leading-none font-extrabold text-white hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
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
                    className="text-[1.8rem] leading-none font-extrabold text-white hover:text-[#5CC6D0] transition-colors whitespace-nowrap"
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

      {/* Main Content */}
      <main 
        className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:ml-[120px]'
        }`}
      >
        {mainContent}
      </main>
    </div>
  );
};

export default PhotoJournal;
