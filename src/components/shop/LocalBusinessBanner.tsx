
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Business {
  name: string;
  logo: string;
  url: string;
  description: string;
}

const LocalBusinessBanner: React.FC = () => {
  const businesses: Business[] = [
    {
      name: "DJ PsyBod",
      logo: "/lovable-uploads/32db7ff8-a0d0-493b-8197-3e9ce7d37dc9.png",
      url: "https://linktr.ee/DJPsybod?utm_source=linktree_profile_share&ltsid=1e377dc0-9b7e-4523-8a00-a2bec6ea6cbc",
      description: "Music Production"
    },
    {
      name: "Atlantis Tattoo",
      logo: "/lovable-uploads/c8fe91f6-fc43-4e11-aa38-982a5f4f80d3.png",
      url: "https://atlantistattoos.com/",
      description: "Tattoo & Art Gallery"
    },
    {
      name: "Lo&Lo's Gift Shop",
      logo: "/lovable-uploads/041fafd9-c492-40eb-9d98-69ca163ba1d1.png",
      url: "https://tr1aqu-eh.myshopify.com/?",
      description: "Gift & Decor"
    },
    {
      name: "Dream Big",
      logo: "/lovable-uploads/596ac232-a7b3-4a45-87ea-b2854f039315.png",
      url: "https://www.dreambigvenues.com/",
      description: "Performing Arts Center"
    }
  ];

  return (
    <Card className="border border-accent/20">
      <CardContent className="pt-6">
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full max-w-full mx-auto"
        >
          <CarouselContent>
            {businesses.map((business) => (
              <CarouselItem key={business.name} className="md:basis-1/2 lg:basis-1/4">
                <a 
                  href={business.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex flex-col items-center p-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg">
                    <div className="w-36 h-36 mb-4 flex items-center justify-center bg-white rounded-lg shadow-md p-2">
                      <img 
                        src={business.logo} 
                        alt={business.name} 
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                    <h3 className="text-lg font-medium text-center">{business.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{business.description}</p>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default LocalBusinessBanner;
