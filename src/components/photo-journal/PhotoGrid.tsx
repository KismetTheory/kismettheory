
import { format } from "date-fns";
import { WordPressImage } from "./types";

interface PhotoGridProps {
  posts: WordPressImage[];
  onImageClick: (index: number) => void;
}

const PhotoGrid = ({ posts, onImageClick }: PhotoGridProps) => {
  console.log('PhotoGrid received posts:', posts.length);
  
  const getImageFromContent = (content: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Try different ways to find images
    const possibleImages = [
      // Try direct img tags
      ...Array.from(doc.querySelectorAll('img')),
      // Try figure tags with img inside
      ...Array.from(doc.querySelectorAll('figure img')),
      // Try wp-block-image class
      ...Array.from(doc.querySelectorAll('.wp-block-image img'))
    ];

    // Try different sources for the image URL
    for (const img of possibleImages) {
      // First try the optimized image source
      const url = img.getAttribute('data-opt-src') || 
                 img.getAttribute('src') || 
                 img.getAttribute('data-src');
      
      if (url) {
        console.log('Found image URL in content:', url);
        return url;
      }
    }
    
    // If no image found, log the content for debugging
    console.log('No image found in content:', content);
    return null;
  };
  
  // Debug log for each post's media
  posts?.forEach((post, index) => {
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const contentImage = getImageFromContent(post.content.rendered);
    console.log(`Post ${index + 1}: "${post.title.rendered}"`, {
      hasEmbedded: !!post._embedded,
      hasFeaturedMedia: !!featuredImage,
      hasContentImage: !!contentImage,
      featuredImageUrl: featuredImage,
      contentImageUrl: contentImage
    });
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts?.map((post, index) => {
        const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const contentImageUrl = getImageFromContent(post.content.rendered);
        const imageUrl = featuredImageUrl || contentImageUrl;
        const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
        const postDate = format(new Date(post.date), 'MMMM d, yyyy');

        if (!imageUrl) {
          console.log('Post missing both featured and content images:', {
            title: post.title.rendered,
            embedded: post._embedded,
            featuredMedia: post._embedded?.["wp:featuredmedia"],
            content: post.content.rendered
          });
          return null;
        }

        return (
          <div 
            key={post.id} 
            className="group relative cursor-pointer aspect-square"
            onClick={() => onImageClick(index)}
          >
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-medium text-xl mb-2">{post.title.rendered}</h3>
              <p className="text-white/80 text-sm">{postDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
