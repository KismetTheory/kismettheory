
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { WordPressImage } from "@/components/photo-journal/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface EventsCalendarProps {
  posts: WordPressImage[];
}

const EventsCalendar = ({ posts }: EventsCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Extract dates that have events
  const eventDates = posts?.map(post => new Date(post.date)) || [];
  
  // Find events for the selected date
  const eventsForSelectedDate = selectedDate
    ? posts?.filter(post => {
        const postDate = new Date(post.date);
        return (
          postDate.getDate() === selectedDate.getDate() &&
          postDate.getMonth() === selectedDate.getMonth() &&
          postDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  // Function to determine if a date has events
  const isDayWithEvent = (date: Date) => {
    return eventDates.some(
      eventDate =>
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
    );
  };

  // Function to determine if an event is a Kismet event (example implementation)
  // In a real-world scenario, this would check for specific event categories or tags
  const isKismetEvent = (post: WordPressImage) => {
    // This is a placeholder implementation
    // You might want to check for a specific category or tag in the WordPress post
    return post.title.rendered.toLowerCase().includes('kismet') || 
           (post.content.rendered && post.content.rendered.toLowerCase().includes('kismet'));
  };

  return (
    <Card className="bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden border border-accent/20">
      <CardHeader className="bg-gradient-to-r from-accent/30 to-accent/10 pb-2">
        <CardTitle className="text-2xl font-bold text-center">Events Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {/* Calendar with burgundy background */}
            <div className="bg-[#800020]/90 p-3 rounded-lg relative">
              {/* Kismet events indicator */}
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full text-xs">
                <div className="w-3 h-3 rounded-full bg-[#D946EF]"></div>
                <span className="font-medium">Kismet Events</span>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto bg-white shadow-sm"
                modifiers={{
                  hasEvent: (date) => isDayWithEvent(date),
                  kismetEvent: (date) => {
                    // Check if any event on this date is a Kismet event
                    return posts?.some(post => {
                      const postDate = new Date(post.date);
                      return postDate.getDate() === date.getDate() &&
                             postDate.getMonth() === date.getMonth() &&
                             postDate.getFullYear() === date.getFullYear() &&
                             isKismetEvent(post);
                    }) || false;
                  }
                }}
                modifiersStyles={{
                  hasEvent: { 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(201, 169, 110, 0.2)',
                    borderRadius: '50%' 
                  },
                  kismetEvent: {
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(217, 70, 239, 0.3)', // Pink background for Kismet events
                    borderRadius: '50%',
                    color: '#000'
                  }
                }}
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-lg font-medium mb-4">
              {selectedDate ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date'}
            </h3>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {eventsForSelectedDate?.length > 0 ? (
                eventsForSelectedDate.map(event => (
                  <div 
                    key={event.id} 
                    className={`p-3 rounded-lg border ${
                      isKismetEvent(event) 
                        ? 'bg-[#D946EF]/10 border-[#D946EF]/30' 
                        : 'bg-muted border-border'
                    }`}
                  >
                    <h4 className="font-medium" dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
                    <div className="text-sm text-muted-foreground mt-1" 
                         dangerouslySetInnerHTML={{ __html: event.content.rendered || '' }} />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No events scheduled for this date.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;
