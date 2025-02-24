
import { format } from "date-fns";
import { WordPressImage } from "./types";

interface PhotoGridProps {
  posts: WordPressImage[];
  onImageClick: (index: number) => void;
}

const PhotoGrid = ({ posts, onImageClick }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts?.map((post, index) => {
        const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
        const postDate = format(new Date(post.date), 'MMMM d, yyyy');

        if (!imageUrl) return null;

        return (
          <div 
            key={post.id} 
            className="group relative cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-medium mb-2">{post.title.rendered}</h3>
              <p className="text-white/70 text-sm">{postDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
