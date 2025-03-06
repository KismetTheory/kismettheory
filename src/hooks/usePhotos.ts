
import { useQuery } from "@tanstack/react-query";
import { WordPressImage } from "@/components/photo-journal/types";

// Hardcoded collection of photos with absolute URLs
const staticPhotos: WordPressImage[] = [
  {
    id: 1,
    date: "2019-03-01",
    title: { rendered: "iPhone Capture 140" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1024/h:1024/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/iPhone-Capture140.jpg",
        alt_text: "iPhone Capture 140"
      }]
    }
  },
  {
    id: 2,
    date: "2019-03-02",
    title: { rendered: "Rosie Yoga" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/rosie-yoga.jpg",
        alt_text: "Rosie Yoga"
      }]
    }
  },
  {
    id: 3,
    date: "2019-03-03",
    title: { rendered: "View of Kilimanjaro" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1280/h:891/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/View-of-Kilimanjaro-in-the-distance.jpg",
        alt_text: "View of Kilimanjaro in the distance"
      }]
    }
  },
  {
    id: 4,
    date: "2019-03-04",
    title: { rendered: "Saunton" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1280/h:960/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/Saunton.jpg",
        alt_text: "Saunton"
      }]
    }
  },
  {
    id: 5,
    date: "2019-03-05",
    title: { rendered: "iPhone Capture 180" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1280/h:960/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/iPhone-Capture180.jpg",
        alt_text: "iPhone Capture 180"
      }]
    }
  },
  {
    id: 6,
    date: "2019-03-06",
    title: { rendered: "Image 32" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1280/h:855/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/IMAGE_32.jpg",
        alt_text: "Image 32"
      }]
    }
  },
  {
    id: 7,
    date: "2019-03-07",
    title: { rendered: "iPhone Capture 110" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:1280/h:720/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/iPhone-Capture110.jpg",
        alt_text: "iPhone Capture 110"
      }]
    }
  },
  {
    id: 8,
    date: "2019-03-08",
    title: { rendered: "Kilimanjaro 1601" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:808/h:1080/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/kili-1601.jpg",
        alt_text: "Kilimanjaro 1601"
      }]
    }
  },
  {
    id: 9,
    date: "2019-03-09",
    title: { rendered: "iPhone Capture 9" },
    content: { rendered: "" },
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://mlkwtxmsxa0d.i.optimole.com/w:810/h:1080/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2019/03/iPhone-Capture9.jpg",
        alt_text: "iPhone Capture 9"
      }]
    }
  }
];

export const usePhotos = () => {
  return useQuery<WordPressImage[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      console.log('Returning static collection of photos:', staticPhotos.length);
      return staticPhotos;
    },
    staleTime: 5 * 60 * 1000,
  });
};
