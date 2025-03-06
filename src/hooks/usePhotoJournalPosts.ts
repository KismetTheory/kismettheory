
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";
import { toast } from "@/hooks/use-toast";

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

        while (hasMorePosts) {
          try {
            const response = await fetch(
              `${API_BASE_URL}/posts?_embed&categories=5&per_page=20&page=${page}`
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
        console.error("Failed to fetch photo journal posts:", error);
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
    // Add error handling callback
    meta: {
      errorMessage: "Failed to load photo journal posts"
    },
  });
};
