
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { WordPressImage } from "./types";

interface PhotoLightboxProps {
  selectedImage: WordPressImage | null;
  selectedImageIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const PhotoLightbox = ({ selectedImage, selectedImageIndex, onClose, onNavigate }: PhotoLightboxProps) => {
  return (
    <Dialog open={selectedImageIndex !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-black border-none p-0">
        {selectedImage && (
          <div 
            className="relative flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              ←
            </button>
            <div className="relative">
              <img
                src={selectedImage._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={selectedImage._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || selectedImage.title.rendered}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-xl font-medium mb-2">
                  {selectedImage.title.rendered}
                </h2>
                <p className="text-white/70">
                  {format(new Date(selectedImage.date), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLightbox;
