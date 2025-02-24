
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import PhotoGrid from "@/components/photo-journal/PhotoGrid";
import PhotoLightbox from "@/components/photo-journal/PhotoLightbox";
import { WordPressImage } from "@/components/photo-journal/types";

const PhotoJournal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: posts, error } = useQuery({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jamiemarsland.co.uk/wp-json/wp/v2/posts?_embed&categories=5"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsLoading(false);
      console.log('WordPress API response:', data);
      return data as WordPressImage[];
    },
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!posts || selectedImageIndex === null) return;
    
    if (e.key === 'ArrowRight') {
      setSelectedImageIndex((selectedImageIndex + 1) % posts.length);
    } else if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((selectedImageIndex - 1 + posts.length) % posts.length);
    } else if (e.key === 'Escape') {
      setSelectedImageIndex(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, posts]);

  const selectedImage = selectedImageIndex !== null && posts ? posts[selectedImageIndex] : null;

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!posts || selectedImageIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % posts.length
      : (selectedImageIndex - 1 + posts.length) % posts.length;
    setSelectedImageIndex(newIndex);
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
          <PhotoGrid
            posts={posts}
            onImageClick={(index) => setSelectedImageIndex(index)}
          />
        )}
      </div>

      <PhotoLightbox
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={navigateImage}
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
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
