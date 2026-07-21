export interface LeaderEntry {
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  portrait: string;
  alt: string;
  /** CSS object-position for the 3:4 crop — tuned per photograph. */
  objectPosition: string;
}

export const leadership: LeaderEntry[] = [
  {
    slug: "vishal-singh",
    name: "Vishal Singh",
    role: "Chairman",
    initials: "VS",
    bio: "Founded the group on a workshop floor in India in 1998, when Hemco Kitchens was the whole house. The operating model he set that year — own what you build, fund it from the works — still governs every venture that carries the name.",
    portrait: "/leadership/vishal-singh.jpg",
    alt: "Vishal Singh, Chairman of Hemco Group",
    objectPosition: "50% 18%",
  },
  {
    slug: "vibhaas-singh",
    name: "Vibhaas Singh",
    role: "Vice Chairman",
    initials: "VBS",
    bio: "The architect of the group's second act. Everything the house builds in technology, design, intelligence and defence — Kerning Studio, Kerning AI, Consortium, Consortium Defence & Robotics, Kerning Architecture & Design, Voltverse — began as his brainchild, shaped by a simple conviction: the works should make their own tools.",
    portrait: "/leadership/vibhaas-singh.jpg",
    alt: "Vibhaas Singh, Vice Chairman of Hemco Group",
    objectPosition: "50% 12%",
  },
];
