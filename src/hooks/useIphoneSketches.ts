
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

export const useIphoneSketches = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["iphone-sketches"],
    queryFn: async () => {
      let allSketches: WordPressImage[] = [];
      let page = 1;
      let hasMoreSketches = true;

      // Using the full domain name for API requests
      const API_BASE_URL = "https://jamiemarsland.co.uk/wp-json/wp/v2";

      while (hasMoreSketches) {
        const response = await fetch(
          `${API_BASE_URL}/posts?_embed&categories=2&per_page=20&page=${page}`
        );

        if (response.status === 400) {
          hasMoreSketches = false;
          break;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          hasMoreSketches = false;
          break;
        }

        allSketches = [...allSketches, ...data];
        console.log(`Fetched page ${page}, got ${data.length} sketches. Total so far: ${allSketches.length}`);
        
        if (data.length < 20) {
          hasMoreSketches = false;
        }
        
        page++;
      }

      console.log('Final total iPhone sketches fetched:', allSketches.length);
      return allSketches;
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
