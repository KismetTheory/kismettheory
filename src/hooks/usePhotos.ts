
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";
import { toast } from "@/hooks/use-toast";

// Mock data to use when API is unavailable
const mockPhotos: WordPressImage[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  date: new Date(2023, Math.floor(i / 5), (i % 28) + 1).toISOString(),
  title: { rendered: `Photo ${i + 1}` },
  content: { rendered: `<p>This is a mock photo ${i + 1}.</p>` },
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: `https://picsum.photos/id/${(i * 11) + 200}/800/800`,
        alt_text: `Mock Photo ${i + 1}`
      }
    ]
  }
}));

export const usePhotos = () => {
  return useQuery<WordPressImage[], Error>({
    queryKey: ["photos"],
    queryFn: async () => {
      try {
        // For demonstration, returning a static collection of photos
        // This would normally fetch from the WordPress API like usePhotoJournalPosts
        console.log("Attempting to fetch photos from WordPress API");
        
        // Update with the correct full path
        const API_BASE_URL = "http://79.170.40.177/jamiemarsland.co.uk/wp-json/wp/v2";

        // Try to fetch with a short timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
          // In a real implementation, we would fetch photos from the API
          // For now using a hardcoded category ID that represents "Photos"
          const response = await fetch(
            `${API_BASE_URL}/posts?_embed&categories=3&per_page=20`,
            { signal: controller.signal }
          );
          
          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      } catch (error) {
        console.error("Error fetching photos, using mock data:", error);
        toast({
          title: "Using demo data",
          description: "We couldn't connect to the WordPress site. Using sample data instead.",
          variant: "default",
        });
        
        // Return mock data when the API fails
        return mockPhotos;
      }
    },
    retry: 1, // Only retry once to avoid excessive attempts
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
