
import { Dialog, DialogPortal } from "@/components/ui/dialog";
import { format } from "date-fns";
import { X } from "lucide-react";
import { WordPressImage } from "./types";

interface PhotoLightboxProps {
  selectedImage: WordPressImage | null;
  selectedImageIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const PhotoLightbox = ({ selectedImage, selectedImageIndex, onClose, onNavigate }: PhotoLightboxProps) => {
  if (!selectedImage) return null;

  const getImageUrl = (post: WordPressImage): string | null => {
    // Try featured media first
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (featuredImage) return featuredImage;

    // Parse the content HTML and look for image sources
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    
    // Try different possible image elements and their attributes
    const possibleImages = [
      ...Array.from(doc.querySelectorAll('img')),
      ...Array.from(doc.querySelectorAll('figure img')),
      ...Array.from(doc.querySelectorAll('.wp-block-image img'))
    ];

    for (const img of possibleImages) {
      // Try different possible source attributes
      const url = img.getAttribute('data-opt-src') || 
                 img.getAttribute('src') || 
                 img.getAttribute('data-src');
      
      if (url) return url;
    }
    
    return null;
  };

  const imageUrl = getImageUrl(selectedImage);
  if (!imageUrl) return null;

  return (
    <Dialog open={selectedImageIndex !== null} onOpenChange={onClose}>
      <DialogPortal>
        <div className="fixed inset-0 z-50">
          <div 
            className="relative flex items-center justify-center w-full h-full backdrop-blur-xl bg-black/30 cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              className="absolute left-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              ←
            </button>

            <div 
              className="relative max-w-7xl mx-auto px-4 w-full h-full flex items-center justify-center"
            >
              <img
                src={imageUrl}
                alt={selectedImage._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || selectedImage.title.rendered}
                className="max-w-full max-h-[90vh] h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <div className="inline-block px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm">
                  <h2 className="text-white text-lg font-medium">
                    {selectedImage.title.rendered}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {format(new Date(selectedImage.date), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              className="absolute right-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default PhotoLightbox;
