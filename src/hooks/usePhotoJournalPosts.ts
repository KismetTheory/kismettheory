
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";
import { toast } from "@/hooks/use-toast";

// Mock data to use when API is unavailable
const mockPhotoJournalPosts: WordPressImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  date: new Date(2023, Math.floor(i / 3), (i % 28) + 1).toISOString(),
  title: { rendered: `Photo Journal Entry ${i + 1}` },
  content: { rendered: `<p>This is a mock photo journal entry ${i + 1}.</p>` },
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: `https://picsum.photos/id/${(i * 10) + 100}/800/600`,
        alt_text: `Mock Photo Journal Image ${i + 1}`
      }
    ]
  }
}));

export const usePhotoJournalPosts = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      try {
        let allPosts: WordPressImage[] = [];
        let page = 1;
        let hasMorePosts = true;

        // Update with the correct full path
        const API_BASE_URL = "http://79.170.40.177/jamiemarsland.co.uk/wp-json/wp/v2";
        
        console.log("Fetching posts using API URL:", API_BASE_URL);

        // Try to fetch from API with a short timeout
        const fetchWithTimeout = async (url: string, timeoutMs: number = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
          
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            throw error;
          }
        };

        while (hasMorePosts) {
          try {
            const response = await fetchWithTimeout(
              `${API_BASE_URL}/posts?_embed&categories=5&per_page=20&page=${page}`,
              5000
            );

            if (response.status === 400) {
              hasMorePosts = false;
              break;
            }

            if (!response.ok) {
              console.error(`HTTP error! status: ${response.status}`);
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
              hasMorePosts = false;
              break;
            }

            allPosts = [...allPosts, ...data];
            console.log(`Fetched page ${page}, got ${data.length} posts. Total so far: ${allPosts.length}`);
            
            if (data.length < 20) {
              hasMorePosts = false;
            }
            
            page++;
          } catch (error) {
            console.error("Error fetching page", page, error);
            hasMorePosts = false;
            throw error;
          }
        }

        console.log('Final total posts fetched:', allPosts.length);
        return allPosts;
      } catch (error) {
        console.error("Failed to fetch photo journal posts, using mock data:", error);
        toast({
          title: "Using demo data",
          description: "We couldn't connect to the WordPress site. Using sample data instead.",
          variant: "default",
        });
        
        // Return mock data when the API fails
        return mockPhotoJournalPosts;
      }
    },
    retry: 1, // Only retry once to avoid excessive attempts
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    // Add error handling callback
    meta: {
      errorMessage: "Failed to load photo journal posts"
    },
  });
};
