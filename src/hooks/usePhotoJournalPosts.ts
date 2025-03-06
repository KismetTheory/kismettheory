
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

export const usePhotoJournalPosts = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      let allPosts: WordPressImage[] = [];
      let page = 1;
      let hasMorePosts = true;

      // Using the full domain name for API requests
      const API_BASE_URL = "https://jamiemarsland.co.uk/wp-json/wp/v2";

      while (hasMorePosts) {
        const response = await fetch(
          `${API_BASE_URL}/posts?_embed&categories=5&per_page=20&page=${page}`
        );

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
        
        if (data.length < 20) {
          hasMorePosts = false;
        }
        
        page++;
      }

      console.log('Final total posts fetched:', allPosts.length);
      return allPosts;
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
