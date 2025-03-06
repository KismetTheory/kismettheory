
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

export const usePhotos = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      let allPosts: WordPressImage[] = [];
      let page = 1;
      let hasMorePosts = true;

      while (hasMorePosts) {
        const response = await fetch(
          `https://jamiemarsland.co.uk/wp-json/wp/v2/posts?_embed&categories=6&per_page=20&page=${page}`
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
        console.log(`Fetched page ${page}, got ${data.length} photos. Total so far: ${allPosts.length}`);
        
        if (data.length < 20) {
          hasMorePosts = false;
        }
        
        page++;
      }

      console.log('Final total photos fetched:', allPosts.length);
      return allPosts;
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
