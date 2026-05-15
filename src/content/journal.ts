export interface JournalEntry {
  slug: string;
  date: string;
  category: "Group" | "Manufacturing" | "AI" | "Defence" | "Foundation";
  title: string;
  dek: string;
  byline?: string;
  body: string[];
  related?: string[];
}

export const journal: JournalEntry[] = [
  {
    slug: "lumonn-pilot-announced",
    date: "2026.04",
    category: "Group",
    title: "Lumonn announces first pilot reactor.",
    dek: "The group's clean-energy venture moves from research to its first contained pilot, with commissioning expected within eighteen months.",
    byline: "Office of the Chairman",
    body: [
      "After three years of quiet engineering, Lumonn — the group's clean-energy venture — has formally entered its first build phase. The pilot, designated L-01, is a contained low-energy reactor sized for distributed industrial loads. It is not a research apparatus; it is the first unit intended to leave the lab.",
      "Lumonn's thesis is straightforward. Most of the world's industrial heat and base-load power still comes from combustion. A small, walk-up clean reactor — sized for a single factory, hospital campus, or municipal district — should be simpler to certify, simpler to deploy, and simpler to own outright than the megaprojects the sector has historically chased.",
      "L-01 will be sited adjacent to the works, where existing utilities and personnel can support commissioning. Operations are expected to begin within eighteen months of first concrete. A regulatory dossier, prepared with Cronuss Associates, has been lodged with the appropriate state and central authorities.",
      "The pilot is funded internally. Strategic partners interested in the next site — particularly distribution into Southeast Asia and the Gulf — are invited to write to the corporate desk.",
    ],
    related: ["consortium-charter", "defence-robotics-incorporated"],
  },
  {
    slug: "kerning-ai-european-base",
    date: "2026.03",
    category: "AI",
    title: "Kerning AI opens its European base.",
    dek: "A new operations centre formalises the venture's hospitality work across European markets, with a small founding team relocating from India.",
    byline: "Kerning AI",
    body: [
      "Kerning AI has formally opened its first overseas operations centre. The facility, in continental Europe, will serve as the venture's base for hospitality clients across the EU and the United Kingdom — a market the team has been quietly serving for two years through a remote model.",
      "The decision to plant a flag locally was driven by customer cadence rather than capital availability. Hospitality operations move on the timescale of a service, not a sprint. Being in-market means the team can sit in pre-shift briefings and walk a kitchen on a Sunday afternoon.",
      "A small founding team has relocated from India. The venture continues to engineer from the works — the European office is operations-led, with engineering remaining in India.",
      "Existing customers will see no change in service. New enquiries — particularly from European hotel groups and institutional caterers — should write directly to the venture.",
    ],
    related: ["consortium-charter", "hemco-twentyseventh-year"],
  },
  {
    slug: "consortium-charter",
    date: "2026.02",
    category: "AI",
    title: "Consortium is chartered.",
    dek: "A new decision-intelligence venture, incubated under Kerning AI, is formally constituted to serve Indian institutional clients.",
    byline: "Office of the Chairman",
    body: [
      "Consortium is now a separately chartered entity within Hemco Group. The venture, which has been incubating under Kerning AI for the last fifteen months, will operate from this point forward as a distinct house.",
      "Consortium's mandate is decision intelligence for Indian institutions — data fusion, operational analytics, and mission software for state and central government clients, public-sector enterprises, and the larger of the country's private institutions. The brief is deliberately constrained: indigenous, sovereign, owned end-to-end.",
      "The decision to spin Consortium out reflects how the work has matured. What began as a small applied-research effort inside Kerning AI is now a fully separate engineering organisation, with its own clearances, contract vehicle, and roadmap. Keeping it inside Kerning AI was beginning to slow both ventures down.",
      "Consortium will not be in the business of selling licences off a shelf. It will be in the business of being inside the room when an Indian institution decides what to build next.",
    ],
    related: ["lumonn-pilot-announced", "kerning-ai-european-base"],
  },
  {
    slug: "mvv-skilling-cohort",
    date: "2025.11",
    category: "Foundation",
    title: "MVV Foundation seats its third skilling cohort.",
    dek: "Forty new apprentices begin the foundation's culinary skilling programme, with placements across group and partner kitchens.",
    byline: "MVV Foundation",
    body: [
      "MVV Foundation, Hemco Group's philanthropic arm, has seated its third culinary-skilling cohort. Forty apprentices, drawn from Uttar Pradesh and three neighbouring states, will spend the next nine months training inside the group's kitchen platform.",
      "The programme is structured as a paid apprenticeship. Trainees rotate through fabrication, pre-production, line, and service stations — and finish with a placement at a group kitchen, a partner restaurant, or a hotel that hires from the cohort. Two-thirds of the previous cohorts are still placed inside the industry.",
      "The foundation operates on a small budget by design. The thesis is that the group's manufacturing platform is itself the curriculum — there is no shortage of equipment, mentors, or live work to train against.",
      "Applications for the next cohort open in the spring. Partners interested in absorbing graduates, or in seating apprentices in their own kitchens, should write to the foundation directly.",
    ],
  },
  {
    slug: "defence-robotics-incorporated",
    date: "2025.09",
    category: "Defence",
    title: "Defence & Robotics is incorporated.",
    dek: "The group formally enters sovereign defence manufacturing — precision munitions, unmanned systems, and the autonomous software that commands them.",
    byline: "Office of the Chairman",
    body: [
      "Consortium Defence & Robotics has been formally incorporated. The venture extends Hemco Group's manufacturing platform into sovereign defence — precision munitions, unmanned aerial and ground systems, and the autonomous software that commands them.",
      "The decision to enter the sector was not taken quickly. Defence manufacturing carries durable obligations: clearances, oversight, traceability, and a relationship with the state that lasts longer than a product cycle. The group has spent two years preparing the legal, regulatory, and engineering ground for the move.",
      "CDR will operate from a dedicated facility, separate from the kitchens works, with its own security perimeter and personnel. Engineering leadership has been seated; first programmes are under contract.",
      "Detail beyond this notice will be limited, and intentionally so. Enquiries from the Ministry of Defence ecosystem — DRDO labs, prime contractors, and authorised export partners — should be routed through Cronuss Associates.",
    ],
    related: ["lumonn-pilot-announced", "consortium-charter"],
  },
  {
    slug: "hemco-twentyseventh-year",
    date: "2025.06",
    category: "Manufacturing",
    title: "Hemco enters its twenty-seventh year.",
    dek: "The flagship kitchens venture marks more than a quarter century of continuous operation from the works.",
    byline: "Hemco Kitchens",
    body: [
      "Hemco Kitchens — the venture from which the rest of the group eventually grew — has begun its twenty-seventh year of operation. The works, in India, have not closed for a single full week since 1998.",
      "What began as a stainless-fabrication shop building cooking ranges to order has become an integrated commercial-kitchen platform — cooking, refrigeration, extraction, smallwares, and the connected-kitchen intelligence layer. The customer set has grown with it: independent restaurants, hotel groups, cloud kitchens, QSR chains, and institutional caterers across India and abroad.",
      "More than the products, the works themselves are the asset. The platform has been the training ground, the test bed, and — increasingly — the product itself. Several of the group's newer ventures exist because the works needed them.",
      "There is no anniversary release planned. The twenty-seventh year will be like the twenty-sixth: the line will run, the orders will ship, and the rest of the group will continue to be quietly built around it.",
    ],
    related: ["lumonn-pilot-announced", "mvv-skilling-cohort"],
  },
];

export const journalBySlug = Object.fromEntries(
  journal.map((j) => [j.slug, j] as const),
) as Record<string, JournalEntry>;
