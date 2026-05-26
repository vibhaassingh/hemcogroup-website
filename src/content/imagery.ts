/**
 * Editorial imagery — real Unsplash photo IDs.
 *
 * REPLACE in content pass 2 with documentary-style commissioned
 * photography of the actual factory floor, finished installations,
 * and craft details.
 *
 * URL pattern: https://images.unsplash.com/photo-{id}?w=1600&q=80&auto=format&fit=crop
 */

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&q=82&auto=format&fit=crop`;

export const imagery = {
  // Hemco Kitchens — chef in service at a Hemco-engineered stainless
  // line, combi oven and full equipment ecosystem visible behind.
  hemco: {
    src: "/brand/hemco-hero.jpg",
    alt: "Chef seasoning at a Hemco-built stainless service line",
    caption: "Commercial kitchen, works in India",
  },
  // Kerning Studio — orange-on-black silhouette, motion-blurred figure
  // crossing a ringed sun. Echoes the brand book's "warm contrast"
  // combination (Orange-Red + Graphite Black).
  kerningStudio: {
    src: "/brand/kerning-hero.webp",
    alt: "Silhouetted figure crossing an orange sun — Kerning Studio",
    caption: "Studio identity",
  },
  // Kerning AI — robotic welding line on the automotive production
  // floor. The brand's "AI for the operations no one writes about" —
  // metal, sparks, and software running the line.
  kerningAI: {
    src: "/brand/kerning-ai-hero.jpg",
    alt: "Robotic welding cell on an automotive production line — Kerning AI",
    caption: "Operations centre",
  },
  // Consortium — analytics surface, deep blue with luminous data on
  // glass. The decision-intelligence visual: information becoming choice.
  consortium: {
    src: u("1551288049-bebda4e38f71"),
    alt: "Luminous analytics on a dark surface — Consortium",
    caption: "Decision intelligence",
  },
  // Lumonn — dramatic light, structure
  lumonn: {
    src: u("1644838962161-49f6cb7f91b4"),
    alt: "Sun through industrial structure — placeholder",
    caption: "Reactor pilot",
  },
  // Keystonne — two chefs through the pass, the kitchen as a working
  // ecosystem of pots, racks, and stainless surfaces. Reads as the
  // marketplace's reason for being: everything the back-of-house needs.
  keystonne: {
    src: "/brand/keystonne-hero.jpg",
    alt: "Two chefs working through a stainless pass — Keystonne",
    caption: "Catalogue",
  },
  // Consortium Defence & Robotics — foundry sparks
  defence: {
    src: u("1759411364558-38a9e2b04f76"),
    alt: "Foundry workers with sparks — placeholder",
    caption: "Fabrication",
  },
  // Kerning Hospitality — utensils
  hospitality: {
    src: u("1749478072094-d21cb929490c"),
    alt: "Hanging kitchen utensils — placeholder",
    caption: "Service line",
  },
  // Kerning Architecture — soft cast-shadow on a warm plaster wall.
  // Reads as a quiet material moment rather than a building photo —
  // matches the practice's draughtsman / material-honest sensibility.
  architecture: {
    src: u("1545324418-cc1a3fa10c00"),
    alt: "Cast shadow across a warm plaster wall — Kerning Architecture",
    caption: "Studio reference",
  },
  // Cronuss Associates — Lady Justice, gavel, contract handshake.
  // The classic counsel-for-builders tableau: brass scales of justice
  // beside a signed agreement — the firm's brief in one frame.
  cronuss: {
    src: "/brand/cronuss-hero.jpg",
    alt: "Lady Justice statue beside a contract handshake — Cronuss Associates",
    caption: "Cronuss Associates",
  },
  // IndiaBridg — a legislative chamber in session. The regulatory and
  // government ecosystem the firm bridges, rendered as institutional
  // gravitas rather than photography of the firm itself.
  indiabridg: {
    src: u("1529107386315-e1a2ed48a620"),
    alt: "A legislative chamber in session — IndiaBridg's government interface",
    caption: "Government interface",
  },
  // Voltverse — the live product's charging map, night theme: every
  // Indian charge-point operator as one network of glowing pins across
  // the country. Sourced from the Voltverse map surface.
  voltverse: {
    src: "/brand/voltverse-map.jpg",
    alt: "Voltverse charging map — every charge point operator across India in one view",
    caption: "Charging network",
  },
  // MVV Foundation — students in uniform, focused on their work.
  // The brief in one frame: returning what we've learned to the city
  // that taught us, through education and culinary skilling.
  mvv: {
    src: "/brand/mvv-hero.jpg",
    alt: "Students in school uniform focused on learning — MVV Foundation",
    caption: "MVV Foundation",
  },

  // Capabilities / craft section
  craftPrimary: {
    src: u("1635184551030-5802a699c71b"),
    alt: "Industrial laborer at machinery — placeholder",
    caption: "The works · India",
  },
  craftSecondary: {
    src: u("1635184549996-8e482768acea"),
    alt: "Metalwork in progress — placeholder",
    caption: "Stainless fabrication",
  },
  craftTertiary: {
    src: u("1759411364558-38a9e2b04f76"),
    alt: "Foundry sparks — placeholder",
    caption: "Foundry",
  },
  craftWide: {
    src: "/brand/culinary-hero.jpg",
    alt: "Pristine commercial kitchen — chefs at the prep line, hanging pots",
    caption: "The works in service",
  },

  // Heritage / group hero
  heritage: {
    src: u("1768640307806-f836c0080b3e"),
    alt: "Heritage industrial architecture — placeholder",
    caption: "The original works, India",
  },
} as const;

export type ImageryKey = keyof typeof imagery;

/**
 * Documentary-craft loop for the Capabilities section.
 * Royalty-free Pexels footage. Replace with commissioned footage of the
 * works in India in the next content pass.
 */
export const craftFilm = {
  src: "https://videos.pexels.com/video-files/2865277/2865277-uhd_2560_1440_30fps.mp4",
  // Reuse a still as poster for instant paint
  poster: u("1759411364558-38a9e2b04f76"),
  caption: "Documentary loop, the works",
};

/**
 * Leadership portrait placeholders — to be commissioned in B&W.
 * Treated with `filter: grayscale(100%)` until real shoots land.
 */
export const portraits = [
  { src: u("1519085360753-af0119f7cbe7"), alt: "Portrait — placeholder" },
  { src: u("1586232902955-df204f34b36e"), alt: "Portrait — placeholder" },
  { src: u("1622020920816-cd528763211a"), alt: "Portrait — placeholder" },
  { src: u("1580684518721-3d7c2af77e5a"), alt: "Portrait — placeholder" },
] as const;
