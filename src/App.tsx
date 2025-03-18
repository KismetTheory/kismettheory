
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PhotoJournal from "./pages/PhotoJournal";
import IphoneSketches from "./pages/IphoneSketches";
import Photos from "./pages/Photos";
import Paintings from "./pages/Paintings";
import WorldMap from "./pages/WorldMap";
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photo-journal" element={<PhotoJournal />} />
          <Route path="/iphone-sketches" element={<IphoneSketches />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/world-map" element={<WorldMap />} />
          <Route path="/youtube-shorts-article" element={<YouTubeShorts />} />
          {/* Add alternate URL without trailing slash to handle both cases */}
          <Route path="youtube-shorts-article" element={<Navigate to="/youtube-shorts-article" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
