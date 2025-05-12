
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Gem, Atom, Flower, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Jewelry = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      toast.success("Thanks for joining our circle! We'll keep you updated.");
      emailInput.value = '';
    }
  };

  const categories = [
    {
      title: "Fine Jewelry",
      icon: Gem,
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      link: "#fine-jewelry"
    },
    {
      title: "Energy Infused",
      icon: Atom,
      image: "https://images.unsplash.com/photo-1588533588400-9f1549789c7c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      link: "#energy-infused"
    },
    {
      title: "Boho and Wrapped",
      icon: Flower,
      image: "https://images.unsplash.com/photo-1535632066276-1474f9d20fe7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      link: "#boho-wrapped"
    },
    {
      title: "Leather and Wood",
      icon: Scissors,
      image: "https://images.unsplash.com/photo-1573487885533-324e913d75d9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      link: "#leather-wood"
    }
  ];
  
  const newArrivals = [
    {
      title: "Crystal Pendant",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      price: "$59.99"
    },
    {
      title: "Moon Phase Earrings",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      price: "$45.00"
    },
    {
      title: "Wooden Bangle",
      image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      price: "$32.50"
    },
    {
      title: "Energy Stone Ring",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      price: "$78.99"
    }
  ];

  return (
    <CategoryLayout title="Jewelry">
      {/* Hero Quote Section */}
      <div className="relative h-[300px] md:h-[400px] mb-12 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb" 
          alt="Jewelry collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">"I don't need anymore jewelry"</h2>
            <p className="text-xl md:text-2xl italic">- said no one ever</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>
        <div className="flex flex-wrap justify-center">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className={`w-full md:w-1/2 lg:w-1/4 p-4 flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } md:justify-center`}
            >
              <Link 
                to={category.link}
                className="group"
              >
                <div className="w-48 flex flex-col items-center transition-transform hover:-translate-y-2">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary mb-4 transform transition-all group-hover:scale-105">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <category.icon className="mr-2 text-primary" size={18} />
                    <h3 className="text-lg font-medium">{category.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Change The Vibe Section */}
      <section className="mb-16 py-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Change The Vibe</h2>
          <p className="text-center mb-8">
            Just like our energy infused pieces, these custom creations are designed to move and motivate. 
            However, this is a tailored experience crafted specifically for you and your unique energy. 
            Let us create something that resonates with your personal journey.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/contact">Explore Custom Options</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
        <Card className="border border-accent/20">
          <CardContent className="pt-6">
            <Carousel
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {newArrivals.map((item) => (
                  <CarouselItem key={item.title} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-[200px] w-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-primary font-semibold">{item.price}</p>
                      </div>
                    </div>
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
      </section>

      {/* Join Our Circle Section */}
      <section className="py-12 px-4 bg-primary/10 rounded-xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Join Our Circle</h2>
          <p className="mb-6">Sign up to receive updates on new arrivals, special offers and more.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              name="email"
              placeholder="Your email address" 
              className="flex-1" 
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </CategoryLayout>
  );
};

export default Jewelry;
