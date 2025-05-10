
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { useIphoneSketches } from "@/hooks/useIphoneSketches";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MusicIcon, Mic, PenIcon, PaintRoller } from "lucide-react";

const artistTypes = [
  { id: "djs", label: "DJs / Producers", icon: <MusicIcon className="h-4 w-4 mr-2" /> },
  { id: "comedians", label: "Comedians", icon: <Mic className="h-4 w-4 mr-2" /> },
  { id: "singers", label: "Singers", icon: <Mic className="h-4 w-4 mr-2" /> },
  { id: "bands", label: "Bands", icon: <MusicIcon className="h-4 w-4 mr-2" /> },
  { id: "writers", label: "Writers", icon: <PenIcon className="h-4 w-4 mr-2" /> },
  { id: "painters", label: "Painters", icon: <PaintRoller className="h-4 w-4 mr-2" /> },
];

const artistData = {
  djs: [
    { name: "DJ Harmony", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-10-scaled.jpg", bio: "Electronic music producer specializing in ambient soundscapes and deep techno." },
    { name: "Producer Ray", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-3-scaled.jpg", bio: "House and techno producer with a focus on analog synths and groovy basslines." }
  ],
  comedians: [
    { name: "Lisa Jokes", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-4.jpg", bio: "Stand-up comedian known for observational comedy and quick wit." },
    { name: "Mike Laugh", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-7-scaled.jpg", bio: "Improv specialist and comedy writer for various local shows." }
  ],
  singers: [
    { name: "Melody Voice", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-1-scaled.jpg", bio: "R&B vocalist with a four-octave range and soulful delivery." },
    { name: "Harmony Blues", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-5-scaled.jpg", bio: "Jazz singer specializing in classic standards and original compositions." }
  ],
  bands: [
    { name: "The Locals", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-6-scaled.jpg", bio: "Indie rock quartet with influences from 90s alternative and modern indie." },
    { name: "Street Symphony", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-8-scaled.jpg", bio: "Folk-rock band known for intricate harmonies and storytelling lyrics." }
  ],
  writers: [
    { name: "Prose Master", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-9-scaled.jpg", bio: "Short story writer focusing on magical realism and urban fantasy." },
    { name: "Lyrical Poet", image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/05/photo-scaled.jpg", bio: "Published poet with three collections and numerous awards." }
  ],
  painters: [
    { name: "Vivid Colors", image: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7217.jpg", bio: "Abstract painter working primarily with acrylics and mixed media." },
    { name: "Urban Sketcher", image: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7160-1.jpg", bio: "Architectural artist capturing city scenes in ink and watercolor." }
  ]
};

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  artistType: z.string().min(1, { message: "Please select an artist type" }),
  bio: z.string().min(20, { message: "Bio should be at least 20 characters" }).max(500, { message: "Bio should not exceed 500 characters" }),
  socialLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const IphoneSketches = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("djs");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Form handling
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      artistType: "",
      bio: "",
      socialLink: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Submission received!",
      description: "Thank you for your interest. We'll review your submission soon.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />

      <main className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${isMenuOpen ? 'translate-x-full md:translate-x-[300px]' : 'translate-x-0'} ${'md:ml-[120px]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <h1 className="text-4xl font-bold text-foreground mb-8">Meet Your Makers</h1>
          
          {/* About Us Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-4">
                  We are Kismet Theory, a collective of artists, musicians, writers, and creators brought together by a shared vision: to lift each other up and build a vibrant creative community.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Founded in 2023, our mission is to provide a platform for local talent to showcase their work, collaborate across disciplines, and engage with the community through events, workshops, and creative initiatives.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether you're an established artist or just beginning your creative journey, we welcome you to join our growing family of makers and visionaries.
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden h-[300px] md:h-auto">
                <img 
                  src="https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-18-scaled.jpg" 
                  alt="Kismet Theory Collective" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <Badge className="mb-2" variant="secondary">Est. 2023</Badge>
                  <h3 className="text-white text-xl font-bold">The Collective</h3>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Artists Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Local Artists</h2>
            <Tabs defaultValue="djs" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="flex flex-wrap mb-8 bg-transparent gap-2">
                {artistTypes.map((type) => (
                  <TabsTrigger 
                    key={type.id} 
                    value={type.id}
                    className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {type.icon}
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(artistData).map(([type, artists]) => (
                <TabsContent key={type} value={type} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artists.map((artist, idx) => (
                      <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-64">
                          <img 
                            src={artist.image} 
                            alt={artist.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-5">
                          <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
                          <p className="text-muted-foreground mb-4">{artist.bio}</p>
                          <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
          {/* Submission Form */}
          <section className="mb-16">
            <div className="bg-muted rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Join Our Collective</h2>
              <p className="text-muted-foreground mb-8">
                Are you a local artist looking to connect, collaborate, and grow with like-minded creators? 
                Submit your details below to be featured on our platform and participate in upcoming events.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="artistType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist Type</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            {...field}
                          >
                            <option value="">Select artist type</option>
                            {artistTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself and your artistic practice (max 500 characters)" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="socialLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Media or Portfolio Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Why would you like to join our collective?" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto">Submit Application</Button>
                </form>
              </Form>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I join Kismet Theory?</AccordionTrigger>
                <AccordionContent>
                  Fill out the submission form above with your details and portfolio. Our team reviews applications monthly and will reach out if your work aligns with our collective.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you host regular events?</AccordionTrigger>
                <AccordionContent>
                  Yes! We organize monthly showcases, workshops, and collaborative sessions. Check our Events page for upcoming dates and opportunities to participate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a membership fee?</AccordionTrigger>
                <AccordionContent>
                  We currently don't charge a membership fee. We operate on a collaborative basis where members contribute their skills, time, and resources to support the collective's initiatives.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I collaborate with other artists in the collective?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Fostering collaboration between different artistic disciplines is one of our core values. We regularly facilitate networking opportunities and collaborative projects.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
    </div>
  );
};

export default IphoneSketches;
