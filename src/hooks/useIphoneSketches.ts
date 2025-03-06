
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

export const useIphoneSketches = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["iphone-sketches"],
    queryFn: async () => {
      try {
        // First fetch the iPhone Sketches page by its slug
        const API_BASE_URL = "https://jamiemarsland.co.uk/wp-json/wp/v2";
        
        // Get the page content directly using the slug
        const pageResponse = await fetch(
          `${API_BASE_URL}/pages?slug=iphone-sketches&_embed`
        );
        
        if (!pageResponse.ok) {
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
        console.error("Error fetching iPhone sketches:", error);
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
};
