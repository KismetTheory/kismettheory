
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CharityGallery: React.FC = () => {
  // These would typically be images from WordPress or another CMS
  const galleryImages = [
    {
      id: 1,
      src: "https://via.placeholder.com/400x300?text=Field+Trip",
      alt: "Students on a field trip",
      caption: "3rd grade students visiting the science museum"
    },
    {
      id: 2,
      src: "https://via.placeholder.com/400x300?text=Charity+Event",
      alt: "Fundraising event",
      caption: "Our recent fundraising event for Delmar Elementary"
    },
    {
      id: 3,
      src: "https://via.placeholder.com/400x300?text=School+Garden",
      alt: "School garden project",
      caption: "The school garden project funded by our donations"
    },
    {
      id: 4,
      src: "https://via.placeholder.com/400x300?text=Art+Class",
      alt: "Art class supplies",
      caption: "New art supplies purchased with donations"
    }
  ];

  return (
    <Card className="border border-accent/20">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="space-y-2">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-48 object-cover rounded-md" 
              />
              <p className="text-sm text-center">{image.caption}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CharityGallery;
