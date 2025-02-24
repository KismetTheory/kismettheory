
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface WordPressImage {
  id: number;
  date: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

const PhotoJournal = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data: posts, error } = useQuery({
    queryKey: ["photo-journal-posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jamiemarsland.co.uk/wp-json/wp/v2/posts?_embed&categories=3"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsLoading(false);
      return data as WordPressImage[];
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Photo Journal</h1>
          <p className="text-red-500">Error loading photos. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Photo Journal</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => {
              const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;

              if (!imageUrl) return null;

              return (
                <div key={post.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-medium">{post.title.rendered}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoJournal;
