import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Gem, Sparkles, Wand2, Home } from "lucide-react";
import { getRandomAffirmation, type Affirmation } from "@/data/affirmations";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";

const EnergyDecor = () => {
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation>({ text: "" });

  useEffect(() => {
    setDailyAffirmation(getRandomAffirmation());
  }, []);

  const categories = [
    {
      title: "Crystals & Accessories",
      icon: Gem,
      description: "Ethically sourced crystals, crystal jewelry, and accessories to enhance your energy and spiritual practice.",
      image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    {
      title: "Wearable Energy",
      icon: Sparkles,
      description: "Intention-set bracelets, necklaces, and other wearable items created to align with your energy goals.",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    {
      title: "Divination",
      icon: Wand2,
      description: "Tarot decks, oracle cards, and other divination tools to help you connect with your intuition and higher guidance.",
      image: "https://images.unsplash.com/photo-1601577116583-8bbf59f99159?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    {
      title: "Decor",
      icon: Home,
      description: "Sacred space items, altar pieces, and home decor designed to transform your environment's energy.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ];

  return (
    <CategoryLayout title="Energy and Decor">
      {/* Daily Affirmation Section */}
      <Card className="border border-primary/20 mb-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h2 className="text-lg font-medium text-primary mb-2">Daily Affirmation</h2>
            <p className="text-2xl font-serif italic">"{dailyAffirmation.text}"</p>
            {dailyAffirmation.author && (
              <p className="text-sm text-muted-foreground mt-2">— {dailyAffirmation.author}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Featured Categories Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card key={category.title} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                <div className="relative">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover" 
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <category.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="md:col-span-2 p-6 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {category.description}
                  </p>
                  <Button variant="outline" className="self-start">
                    Explore {category.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Pieces Section (similar to Jewelry) */}
      <section className="mb-16 py-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Custom Energy Pieces</h2>
          <p className="text-center mb-8">
            Transform your space with custom energy pieces designed specifically for your intentions.
            Each piece is crafted with your energy signature in mind, creating a unique connection
            between you and your sacred space.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/customs">Order Custom Pieces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Energy Products</h2>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <Card className="border border-accent/20 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-0">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1615486511282-92331a7f1dee?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500" 
                    alt="Amethyst Crystal" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="font-bold mb-2">Amethyst Crystal Cluster</h3>
                  <p className="text-sm text-muted-foreground mb-4">Natural amethyst cluster for protection and spiritual growth.</p>
                  <p className="text-primary font-semibold mb-4">$45.00</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-accent/20 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-0">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1602510169983-4665c0e8524b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500" 
                    alt="Sage Bundle" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="font-bold mb-2">White Sage Bundle</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ethically sourced white sage for cleansing your space.</p>
                  <p className="text-primary font-semibold mb-4">$12.99</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-accent/20 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-0">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1648221825763-8e9771ddf61c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500" 
                    alt="Tarot Deck" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="font-bold mb-2">Handcrafted Tarot Deck</h3>
                  <p className="text-sm text-muted-foreground mb-4">Unique artist-designed tarot cards for divination practice.</p>
                  <p className="text-primary font-semibold mb-4">$34.95</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-accent/20 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-0">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1602934585418-f588bec4b39e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500" 
                    alt="Moon Phase Wall Hanging" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="font-bold mb-2">Moon Phase Wall Hanging</h3>
                  <p className="text-sm text-muted-foreground mb-4">Wooden moon phase wall art for your sacred space.</p>
                  <p className="text-primary font-semibold mb-4">$29.99</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </section>

      {/* Join Newsletter Section */}
      <section className="py-12 px-4 bg-primary/10 rounded-xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Join Our Energy Circle</h2>
          <p className="mb-6">Stay connected with our latest energy tools, crystals, and decor items. Be the first to know when new items become available.</p>
          <Button className="w-full sm:w-auto">Subscribe to Updates</Button>
        </div>
      </section>
    </CategoryLayout>
  );
};

export default EnergyDecor;
