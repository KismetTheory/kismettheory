
import React, { useState, useEffect } from "react";
import { format, parse, startOfMonth, endOfMonth } from "date-fns";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import PhotoGrid from "@/components/photo-journal/PhotoGrid";
import PhotoLightbox from "@/components/photo-journal/PhotoLightbox";
import PhotoGridSkeleton from "@/components/photo-journal/PhotoGridSkeleton";
import MonthNavigator from "@/components/photo-journal/MonthNavigator";
import { usePhotoJournalPosts } from "@/hooks/usePhotoJournalPosts";
import EventsCalendar from "@/components/events/EventsCalendar";
import EventSubmissionForm from "@/components/events/EventSubmissionForm";
import EventGallery from "@/components/events/EventGallery";

const PhotoJournal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'yyyy-MM'));
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const {
    data: posts,
    error
  } = usePhotoJournalPosts();

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

  const filteredPosts = posts?.filter(post => {
    const postDate = new Date(post.date);
    const monthStart = startOfMonth(parse(currentMonth, 'yyyy-MM', new Date()));
    const monthEnd = endOfMonth(monthStart);
    return postDate >= monthStart && postDate <= monthEnd;
  });

  const selectedImage = selectedImageIndex !== null && filteredPosts ? filteredPosts[selectedImageIndex] : null;

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!filteredPosts || selectedImageIndex === null) return;
    const newIndex = direction === 'next' ? (selectedImageIndex + 1) % filteredPosts.length : (selectedImageIndex - 1 + filteredPosts.length) % filteredPosts.length;
    setSelectedImageIndex(newIndex);
  };

  const availableMonths: string[] = posts ? Array.from(new Set(posts.map(post => format(new Date(post.date), 'yyyy-MM')))).sort((a, b) => b.localeCompare(a)) : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const currentIndex = availableMonths.indexOf(currentMonth);
    if (currentIndex === -1) return;
    const newIndex = direction === 'prev' ? Math.min(currentIndex + 1, availableMonths.length - 1) : Math.max(currentIndex - 1, 0);
    setCurrentMonth(availableMonths[newIndex]);
    setSelectedImageIndex(null);
  };

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Events</h1>
          {!error && availableMonths.length > 0 && (
            <MonthNavigator 
              currentMonth={currentMonth} 
              availableMonths={availableMonths} 
              onNavigate={navigateMonth} 
            />
          )}
        </div>
        
        {/* Events Calendar */}
        <div className="mb-10">
          {error ? (
            <p className="text-destructive">Error loading events. Please try again later.</p>
          ) : !posts ? (
            <PhotoGridSkeleton />
          ) : (
            <EventsCalendar posts={posts} />
          )}
        </div>
        
        {/* Recent Events Gallery - Moved up in the order */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-primary">Recent Events</h2>
          {error ? (
            <p className="text-destructive">Error loading recent events. Please try again later.</p>
          ) : !posts ? (
            <PhotoGridSkeleton />
          ) : (
            <EventGallery 
              posts={posts} 
              onImageClick={(index) => {
                const postId = posts[index].id;
                const filteredIndex = filteredPosts?.findIndex(post => post.id === postId) ?? -1;
                if (filteredIndex !== -1) {
                  setSelectedImageIndex(filteredIndex);
                }
              }} 
            />
          )}
        </div>
        
        {/* Event Submission Form */}
        <div className="mb-10">
          <EventSubmissionForm />
        </div>
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
    <div className="flex min-h-screen bg-background">
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
      <main className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-full md:translate-x-[300px]' : 'translate-x-0'
      } ${'md:ml-[120px]'}`}>
        {mainContent}
      </main>
    </div>
  );
};

export default PhotoJournal;
