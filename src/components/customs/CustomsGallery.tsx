
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Gallery, Image, TagIcon } from "lucide-react";

// Sample gallery data (replace with actual images later)
const galleryItems = [
  { id: 1, title: "Custom Bracelet", image: "/placeholder.svg" },
  { id: 2, title: "Energy Pendant", image: "/placeholder.svg" },
  { id: 3, title: "Woven Ring", image: "/placeholder.svg" },
  { id: 4, title: "Copper Ring", image: "/placeholder.svg" },
  { id: 5, title: "Resin Art Piece", image: "/placeholder.svg" },
  { id: 6, title: "Custom Necklace", image: "/placeholder.svg" },
  { id: 7, title: "Crystal Grid", image: "/placeholder.svg" },
  { id: 8, title: "Energy Charm", image: "/placeholder.svg" },
];

const CustomsGallery = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Gallery className="h-5 w-5 text-accent" />
        <h3 className="text-xl font-semibold">All Our Custom Projects!</h3>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {galleryItems.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="overflow-hidden rounded-md border border-accent/20 bg-background p-1">
                <div className="aspect-square overflow-hidden rounded-md relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static left-0 translate-y-0 bg-accent/10 hover:bg-accent/20" />
          <CarouselNext className="relative static right-0 translate-y-0 bg-accent/10 hover:bg-accent/20" />
        </div>
      </Carousel>
    </div>
  );
};

export default CustomsGallery;
