
import { format } from "date-fns";
import { WordPressImage } from "./types";

interface PhotoGridProps {
  posts: WordPressImage[];
  onImageClick: (index: number) => void;
}

const PhotoGrid = ({ posts, onImageClick }: PhotoGridProps) => {
  console.log('PhotoGrid received posts:', posts.length);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts?.map((post, index) => {
        const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
        const postDate = format(new Date(post.date), 'MMMM d, yyyy');

        if (!imageUrl) {
          console.log('Post missing image:', post.title.rendered);
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
