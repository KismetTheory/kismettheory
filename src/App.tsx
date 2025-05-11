
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import PhotoJournal from "./pages/PhotoJournal";
import IphoneSketches from "./pages/IphoneSketches";
import SocialEngagement from "./pages/Photos"; // Renamed but kept the file name
import Paintings from "./pages/Paintings";
import Contact from "./pages/WorldMap"; // Renamed but kept the file name
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";
import TarotReadings from "./pages/TarotReadings";
import Charity from "./pages/Charity";
import Spotlight from "./pages/Spotlight";
import Shop from "./pages/Shop";
import Jewelry from "./pages/shop/Jewelry";
import EnergyDecor from "./pages/shop/EnergyDecor";
import RecRoom from "./pages/shop/RecRoom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/photo-journal" element={<PhotoJournal />} />
            <Route path="/iphone-sketches" element={<IphoneSketches />} />
            <Route path="/photos" element={<SocialEngagement />} />
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/world-map" element={<Contact />} /> {/* Keep the old route for backward compatibility */}
            <Route path="/youtube-shorts-article" element={<YouTubeShorts />} />
            <Route path="/youtube-shorts" element={<YouTubeShorts />} />
            <Route path="/tarot-readings" element={<TarotReadings />} />
            <Route path="/charity" element={<Charity />} />
            <Route path="/spotlight" element={<Spotlight />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/jewelry" element={<Jewelry />} />
            <Route path="/shop/energy-decor" element={<EnergyDecor />} />
            <Route path="/shop/rec-room" element={<RecRoom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
