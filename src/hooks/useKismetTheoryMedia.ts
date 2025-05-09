
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

interface KismetTheoryMedia {
  id: number;
  date: string;
  title: { rendered: string };
  caption?: { rendered: string };
  source_url: string;
  media_details: {
    width: number;
    height: number;
  };
  alt_text?: string;
}

export const useKismetTheoryMedia = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["kismettheory-media"],
    queryFn: async () => {
      try {
        const API_BASE_URL = "https://kismettheory.com/wp-json/wp/v2";
        
        // Fetch media items
        const response = await fetch(
          `${API_BASE_URL}/media?per_page=30`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const mediaItems: KismetTheoryMedia[] = await response.json();
        console.log('Fetched media items from kismettheory.com:', mediaItems.length);
        
        // Convert WordPress media format to our app's WordPressImage format
        const formattedMedia: WordPressImage[] = mediaItems.map(item => ({
          id: item.id,
          date: item.date,
          title: item.title,
          content: { rendered: item.caption?.rendered || "" },
          _embedded: {
            "wp:featuredmedia": [
              {
                source_url: item.source_url,
                alt_text: item.alt_text || item.title.rendered
              }
            ]
          }
        }));
        
        return formattedMedia;
      } catch (error) {
        console.error("Error fetching media from kismettheory.com:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
