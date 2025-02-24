
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parse, startOfMonth, endOfMonth } from "date-fns";
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
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'yyyy-MM'));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: posts, error } = useQuery<WordPressImage[]>({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      let allPosts: WordPressImage[] = [];
      let page = 1;
      let hasMorePosts = true;

      while (hasMorePosts) {
        const response = await fetch(
          `https://jamiemarsland.co.uk/wp-json/wp/v2/posts?_embed&categories=5&per_page=20&page=${page}`
        );

        // Check if we've reached the end of available pages
        if (response.status === 400) {
          hasMorePosts = false;
          break;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          hasMorePosts = false;
          break;
        }

        allPosts = [...allPosts, ...data];
        console.log(`Fetched page ${page}, got ${data.length} posts. Total so far: ${allPosts.length}`);
        
        // Check if we got fewer posts than requested, meaning this is the last page
        if (data.length < 20) {
          hasMorePosts = false;
        }
        
        page++;
      }

      console.log('Final total posts fetched:', allPosts.length);
      setIsLoading(false);
      return allPosts;
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!filteredPosts || selectedImageIndex === null) return;
    
    if (e.key === 'ArrowRight') {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredPosts.length);
    } else if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredPosts.length) % filteredPosts.length);
    } else if (e.key === 'Escape') {
      setSelectedImageIndex(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, posts]);

  // Filter posts by current month
  const filteredPosts = posts?.filter(post => {
    const postDate = new Date(post.date);
    const monthStart = startOfMonth(parse(currentMonth, 'yyyy-MM', new Date()));
    const monthEnd = endOfMonth(monthStart);
    return postDate >= monthStart && postDate <= monthEnd;
  });

  const selectedImage = selectedImageIndex !== null && filteredPosts ? filteredPosts[selectedImageIndex] : null;

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!filteredPosts || selectedImageIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % filteredPosts.length
      : (selectedImageIndex - 1 + filteredPosts.length) % filteredPosts.length;
    setSelectedImageIndex(newIndex);
  };

  // Get unique months from posts and sort them in reverse chronological order
  const availableMonths: string[] = posts
    ? Array.from(new Set(posts.map(post => format(new Date(post.date), 'yyyy-MM'))))
        .sort((a, b) => b.localeCompare(a))
    : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const currentIndex = availableMonths.indexOf(currentMonth);
    if (currentIndex === -1) return;

    const newIndex = direction === 'next'
      ? Math.min(currentIndex + 1, availableMonths.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    setCurrentMonth(availableMonths[newIndex]);
    setSelectedImageIndex(null);
  };

  const mainContent = (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Photo Journal</h1>
          {!isLoading && !error && availableMonths.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth('prev')}
                disabled={currentMonth === availableMonths[availableMonths.length - 1]}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Month
              </button>
              <span className="text-xl font-medium min-w-[200px] text-center">
                {format(parse(currentMonth, 'yyyy-MM', new Date()), 'MMMM yyyy')}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                disabled={currentMonth === availableMonths[0]}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Month
              </button>
            </div>
          )}
        </div>
        
        {error ? (
          <p className="text-red-500">Error loading photos. Please try again later.</p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <>
            <PhotoGrid
              posts={filteredPosts}
              onImageClick={(index) => setSelectedImageIndex(index)}
            />
            <div className="mt-4 text-center text-white/70">
              Showing {filteredPosts.length} photos for {format(parse(currentMonth, 'yyyy-MM', new Date()), 'MMMM yyyy')}
            </div>
          </>
        ) : (
          <p className="text-center text-white/70 py-12">No photos found for this month.</p>
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
