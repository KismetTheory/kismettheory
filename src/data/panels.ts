
export const panels = [
  {
    title: "SHOP",
    subtitle: "local vendors",
    image: "https://images.unsplash.com/photo-1542144612-1b3641ec3459",
    path: "/shop"
  },
  {
    title: "EVENTS",
    subtitle: "daily pics",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-32-scaled.jpg",
    path: "/photo-journal"
  },
  {
    title: "MEET YOUR MAKERS",
    subtitle: "sketches",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-18-scaled.jpg",
    path: "/iphone-sketches"
  },
  {
    title: "INTERACTION",
    subtitle: "my favourites",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/03/Screenshot-2025-03-06-at-22.16.46.png",
    path: "/photos"
  },
  {
    title: "CONTACT",
    subtitle: "questions & customs",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-29-scaled.jpg",
    path: "/contact"
  }
];

// Update menu items to use the exact panel titles
export const menuItems = panels.map(panel => panel.title);
// Update menu paths to use the panel paths
export const menuPaths = panels.map(panel => panel.path || '#');
