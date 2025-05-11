import { WordPressImage } from "@/components/photo-journal/types";
interface PhotoGridProps {
  posts: WordPressImage[];
  onImageClick: (index: number) => void;
}
const PhotoGrid = ({
  posts,
  onImageClick
}: PhotoGridProps) => {
  console.log('PhotoGrid received posts:', posts.length);
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts?.map((post, index) => {
      const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
      const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
      if (!imageUrl) {
        return null;
      }
      return <div key={post.id} className="group relative cursor-pointer aspect-square" onClick={() => onImageClick(index)}>
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            </div>
            
          </div>;
    })}
    </div>;
};
export default PhotoGrid;