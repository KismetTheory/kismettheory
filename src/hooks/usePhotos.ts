
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";
import { toast } from "@/hooks/use-toast";

export const usePhotos = () => {
  return useQuery<WordPressImage[], Error>({
    queryKey: ["photos"],
    queryFn: async () => {
      try {
        // For demonstration, returning a static collection of photos
        // This would normally fetch from the WordPress API like usePhotoJournalPosts
        console.log("Returning static collection of photos:", 9);
        
        // Update with the correct full path
        const API_BASE_URL = "http://79.170.40.177/jamiemarsland.co.uk/wp-json/wp/v2";

        // In a real implementation, we would fetch photos from the API
        // For now using a hardcoded category ID that represents "Photos"
        const response = await fetch(
          `${API_BASE_URL}/posts?_embed&categories=3&per_page=20`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching photos:", error);
        toast({
          title: "Error loading photos",
          description: "Please try again later. The server might be temporarily unavailable.",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
