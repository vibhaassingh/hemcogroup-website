import { portraits } from "./imagery";

export interface LeaderEntry {
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  portrait: string;
}

export const leadership: LeaderEntry[] = [
  {
    slug: "chairman",
    name: "—",
    role: "Chairman",
    initials: "—",
    bio: "Founder of Hemco Group. Built the original works in India in 1998 and shaped the compounding operating model that now spans twelve brands.",
    portrait: portraits[0].src,
  },
  {
    slug: "managing-director",
    name: "—",
    role: "Managing Director",
    initials: "—",
    bio: "Leads day-to-day operations across the group's industrial and service ventures.",
    portrait: portraits[1].src,
  },
  {
    slug: "ventures",
    name: "—",
    role: "Director, Ventures",
    initials: "—",
    bio: "Stewards the sovereign book — Lumonn, Consortium, and the group's defence and robotics practice.",
    portrait: portraits[2].src,
  },
  {
    slug: "design",
    name: "—",
    role: "Director, Design & Brand",
    initials: "—",
    bio: "Oversees Kerning Studio and the group's identity, from architecture to packaging.",
    portrait: portraits[3].src,
  },
];
