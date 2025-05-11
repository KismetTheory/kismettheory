
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Facebook, Instagram, Youtube, TiktokLogo } from "./SocialIcons";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const SocialBanner = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/Created4Kismet",
      icon: <Facebook className="h-6 w-6" />,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/created4kismet",
      icon: <Instagram className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90"
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@created4kismet",
      icon: <TiktokLogo className="h-6 w-6" />,
      color: "bg-black hover:bg-gray-900"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/kismettheory",
      icon: <Youtube className="h-6 w-6" />,
      color: "bg-red-600 hover:bg-red-700"
    }
  ];

  return (
    <div className="w-full py-6 bg-muted rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Connect With Us</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full max-w-sm sm:max-w-xl mx-auto"
      >
        <CarouselContent>
          {socialLinks.map((link) => (
            <CarouselItem key={link.name} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all transform hover:scale-105 hover:shadow-lg",
                  link.color
                )}
              >
                <div className="mb-2">
                  {link.icon}
                </div>
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default SocialBanner;
