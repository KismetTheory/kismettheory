
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordPressImage } from "@/components/photo-journal/types";
import { format } from "date-fns";

interface EventGalleryProps {
  posts: WordPressImage[];
  onImageClick: (index: number) => void;
}

const EventGallery = ({ posts, onImageClick }: EventGalleryProps) => {
  // Get the most recent posts (up to 6)
  const recentPosts = posts?.slice(0, 6) || [];
  
  return (
    <Card className="bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden border border-accent/20">
      <CardHeader className="bg-gradient-to-r from-accent/30 to-accent/10 pb-2">
        <CardTitle className="text-2xl font-bold text-center">Recent Events</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {recentPosts.map((post, index) => {
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
            const postDate = format(new Date(post.date), 'MMM d');
            
            if (!imageUrl) return null;
            
            return (
              <div 
                key={post.id} 
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => onImageClick(posts.findIndex(p => p.id === post.id))}
              >
                <img 
                  src={imageUrl} 
                  alt={imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-sm font-medium line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <p className="text-xs text-white/80">{postDate}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventGallery;
