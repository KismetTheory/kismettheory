
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";
import { toast } from "@/hooks/use-toast";

// Mock data to use when API is unavailable
const mockIphoneSketches: WordPressImage[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  date: new Date(2023, Math.floor(i / 3), (i % 28) + 1).toISOString(),
  title: { rendered: `iPhone Sketch ${i + 1}` },
  content: { rendered: `<img src="https://picsum.photos/id/${(i * 13) + 300}/400/600" alt="iPhone Sketch ${i + 1}">` },
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: `https://picsum.photos/id/${(i * 13) + 300}/400/600`,
        alt_text: `iPhone Sketch ${i + 1}`
      }
    ]
  }
}));

export const useIphoneSketches = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["iphone-sketches"],
    queryFn: async () => {
      try {
        // First fetch the iPhone Sketches page by its slug
        // Update with the correct full path
        const API_BASE_URL = "http://79.170.40.177/jamiemarsland.co.uk/wp-json/wp/v2";
        
        console.log("Fetching iPhone sketches using API URL:", API_BASE_URL);
        
        // Try to fetch with a short timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
          // Get the page content directly using the slug
          const pageResponse = await fetch(
            `${API_BASE_URL}/pages?slug=iphone-sketches&_embed`,
            { signal: controller.signal }
          );
          
          clearTimeout(timeoutId);
          
          if (!pageResponse.ok) {
            console.error(`HTTP error! status: ${pageResponse.status}`);
            throw new Error(`HTTP error! status: ${pageResponse.status}`);
          }
          
          const pageData = await pageResponse.json();
          
          if (!Array.isArray(pageData) || pageData.length === 0) {
            console.log("iPhone sketches page not found");
            return [];
          }
          
          // Get the content of the page
          const pageContent = pageData[0].content.rendered;
          
          // Parse the HTML content to extract images
          const parser = new DOMParser();
          const doc = parser.parseFromString(pageContent, 'text/html');
          
          // Find all image elements in the page content
          const imageElements = [...doc.querySelectorAll('img')];
          console.log(`Found ${imageElements.length} images in the iPhone Sketches page content`);
          
          // Convert image elements to our WordPressImage format
          const sketches = imageElements.map((img, index) => {
            const src = img.getAttribute('data-opt-src') || img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';
            
            // Create a WordPress image object with the extracted data
            return {
              id: index + 1, // Generate ID based on index
              date: new Date().toISOString(), // Use current date as fallback
              title: { rendered: alt || `iPhone Sketch ${index + 1}` },
              content: { rendered: `<img src="${src}" alt="${alt}">` },
              _embedded: {
                "wp:featuredmedia": [
                  {
                    source_url: src,
                    alt_text: alt
                  }
                ]
              }
            };
          });
          
          console.log('Final total iPhone sketches fetched:', sketches.length);
          return sketches;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      } catch (error) {
        console.error("Error fetching iPhone sketches, using mock data:", error);
        toast({
          title: "Using demo data",
          description: "We couldn't connect to the WordPress site. Using sample data instead.",
          variant: "default",
        });
        
        // Return mock data when the API fails
        return mockIphoneSketches;
      }
    },
    retry: 1, // Only retry once to avoid excessive attempts
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
