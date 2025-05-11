
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeaturedLink {
  title: string;
  caption: string;
  imageSrc: string;
  link: string;
}

const FeaturedLinks = () => {
  const featuredLinks: FeaturedLink[] = [
    {
      title: "Tarot Card Readings",
      caption: "Tarot card readings coming soon",
      imageSrc: "https://images.unsplash.com/photo-1633142205996-9382eccdd19b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/tarot-readings"
    },
    {
      title: "Finn's Brand Lucky",
      caption: "Charity",
      imageSrc: "https://images.unsplash.com/photo-1598978554684-11651c08fa6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
      link: "/charity"
    },
    {
      title: "Kismet",
      caption: "The Spotlight",
      imageSrc: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/spotlight"
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Featured</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredLinks.map((item, index) => (
          <div key={index} className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform hover:shadow-xl hover:-translate-y-1">
            <Link to={item.link} className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageSrc} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  <ArrowRight className="text-white h-8 w-8" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.caption}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLinks;
