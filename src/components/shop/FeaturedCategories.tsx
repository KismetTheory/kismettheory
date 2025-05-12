
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileDigit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FeaturedCategory {
  title: string;
  imageSrc: string;
  link: string;
  requiresAgeVerification?: boolean;
}

const FeaturedCategories: React.FC = () => {
  const [isAgeDialogOpen, setIsAgeDialogOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<FeaturedCategory | null>(null);

  const categories: FeaturedCategory[] = [
    {
      title: "Jewelry",
      imageSrc: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/shop/jewelry"
    },
    {
      title: "Energy and Decor",
      imageSrc: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/shop/energy-decor"
    },
    {
      title: "The Rec Room",
      imageSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/shop/rec-room"
    },
    {
      title: "Adult Rec",
      imageSrc: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/shop/adult-rec",
      requiresAgeVerification: true
    },
    {
      title: "Digital Merch",
      imageSrc: "https://images.unsplash.com/photo-1633439048217-db9f3e69cf2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/shop/digital-merch"
    }
  ];

  const handleCategoryClick = (category: FeaturedCategory, event: React.MouseEvent) => {
    if (category.requiresAgeVerification) {
      event.preventDefault();
      setPendingCategory(category);
      setIsAgeDialogOpen(true);
    }
  };

  const handleAgeVerification = () => {
    setIsAgeDialogOpen(false);
    if (pendingCategory) {
      window.location.href = pendingCategory.link;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform hover:shadow-xl hover:-translate-y-1">
            <Link 
              to={category.link} 
              className="group"
              onClick={(e) => handleCategoryClick(category, e)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={category.imageSrc} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  {category.title === "Digital Merch" ? (
                    <FileDigit className="text-white h-8 w-8" />
                  ) : (
                    <ArrowRight className="text-white h-8 w-8" />
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-center">{category.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Dialog open={isAgeDialogOpen} onOpenChange={setIsAgeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Age Verification</DialogTitle>
            <DialogDescription>
              You must be 21 years or older to view this content. Please confirm your age to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAgeVerification}>
              I am 21 or older
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeaturedCategories;
