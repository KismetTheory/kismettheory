
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Rss, CalendarDays, LinkIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const TarotReadings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tarot Card Readings</h1>
        
        {/* Tarot Explanation Section */}
        <Card className="mb-8 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">What is Tarot?</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Tarot is a system of divination that uses a deck of 78 cards, each with symbolic imagery 
                and meaning. Dating back to the mid-15th century in Europe, tarot cards were originally 
                created as playing cards and later evolved into tools for divination and spiritual guidance.
              </p>
              <p>
                The standard tarot deck consists of 22 Major Arcana cards representing life's karmic and 
                spiritual lessons, and 56 Minor Arcana cards reflecting the trials and tribulations that we 
                experience on a daily basis. Through the interpretation of these cards, tarot readers aim to 
                provide insights into past, present, and future situations.
              </p>
              <p>
                Today, tarot reading is practiced worldwide as a means of self-discovery, personal growth, 
                and guidance through life's challenges. While some view it as mystical divination, others 
                see it as a psychological tool that helps access the subconscious mind.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Blog Section - Coming Soon */}
        <Card className="mb-8 border-accent/20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Rss className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Tarot Blog</h2>
            </div>
            <div className="text-center py-6">
              <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
              <p className="mb-4">
                Our tarot blog will feature card interpretations, spreads, and spiritual insights.
                Subscribe to be notified when we publish our first articles.
              </p>
              <Button variant="outline" className="bg-white/80 dark:bg-transparent" disabled>
                Subscribe for Updates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Link Section */}
        <Card className="mb-8 border-accent/20 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Divination Store</h2>
            </div>
            <div className="text-center py-4">
              <p className="mb-4">
                Explore our collection of tarot decks, oracle cards, and divination tools.
                Find the perfect deck to begin or enhance your spiritual journey.
              </p>
              <Button asChild>
                <Link to="/shop/energy-decor">Visit Divination Store</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Widget */}
        <Card className="mb-8 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Schedule a Reading</h2>
            </div>
            <div className="md:grid md:grid-cols-2 gap-6">
              <div className="mb-6 md:mb-0">
                <p className="mb-4">
                  Select a date for your tarot reading session. Our experienced readers 
                  are available for both in-person and online consultations.
                </p>
                <p className="mb-4">
                  Once you've selected a date, we'll follow up with available time slots
                  and confirmation details.
                </p>
                <div className="mt-6">
                  <Button disabled className="w-full md:w-auto mb-3 md:mb-0 md:mr-3">
                    Schedule Now (Coming Soon)
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact for Custom Appointments</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
      <main className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-full md:translate-x-[300px]' : 'translate-x-0'
      } ${'md:ml-[120px]'}`}>
        {mainContent}
      </main>
    </div>
  );
};

export default TarotReadings;
