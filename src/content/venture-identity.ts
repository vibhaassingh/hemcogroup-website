/**
 * Per-venture visual + narrative identity.
 *
 * Each venture in the house gets its own colour world, hero treatment,
 * services list, and bespoke long-form approach copy. The detail page
 * reads these tokens and renders a unique experience per venture rather
 * than the generic template the site started with.
 *
 * Palette guidance: the brand spine (navy / gold / ivory / claret) stays
 * — venture accents are layered on top to give each company its own air.
 */

export type BodyTone = "ivory" | "forest" | "ink" | "warm-ivory";

export interface VentureIdentity {
  /** Overall section background for the body of the venture page. */
  bodyTone: BodyTone;
  /** CSS hex for the venture's primary accent. Surfaces in: spec table border,
   * accent-rule colour, eyebrow underline, hero rim. */
  accent: string;
  /** Lighter accent — used for hover states, glints, and the rim light. */
  accentSoft: string;
  /** Deeper accent — used in dark fills and the hero overlay tint. */
  accentDeep: string;
  /** Full CSS gradient string painted over the hero image. */
  heroOverlay: string;
  /** Where the headline anchors in the hero. */
  heroAlign: "bottom" | "center";
  /** Short label above the venture name in the hero (e.g., "Sector · 1998"). */
  heroEyebrow: string;
  /** Optional looped video to play behind the hero. When set, the image
   * (from `venture.imagery`) is still used as the poster / fallback. */
  heroVideo?: string;
  /** A single bold sentence describing what they ship / who they serve. Renders
   * as the lead-in below the hero, before the body. */
  outcomeLine: string;
  /** 4–5 short capability bullets. Each is shown as a row in the
   * Capabilities section. */
  services: { label: string; detail: string }[];
  /** Long-form approach paragraph — replaces the generic template block. */
  approach: string;
  /** Optional second paragraph for ventures with more depth to share. */
  approachContinued?: string;
  /** Optional third paragraph for ventures with deeper material to share —
   *  used by Kerning AI for the Industry-5.0 framing that follows the
   *  origin story and the platform overview. */
  approachExtra?: string;
  /** Optional motto / closing line — italic, gold, sits at the foot. */
  motto?: string;
  /** When set, the venture page renders this venture's own wordmark in the
   * hero (in place of the default serif headline). */
  wordmarkComponent?:
    | "hemco"
    | "kerning"
    | "keystonne"
    | "kerning-ai"
    | "consortium"
    | "lumonn";
  /** Optional triptych panel — three short pillars that summarise the brand
   * essence. Used by Hemco for "Steel · Fire · Vision". */
  pillars?: { eyebrow: string; title: string; body: string }[];
  /** Optional values grid — short, numbered rows shown on a dark gradient
   * panel that echoes the brand's signature blue field. */
  values?: {
    sectionEyebrow: string;
    sectionTitle: string;
    intro: string;
    items: { label: string; body: string }[];
  };
}

export const ventureIdentity: Record<string, VentureIdentity> = {
  /* ────────────────────────────────────────────────────────────────────── */
  "hemco-kitchens": {
    bodyTone: "ivory",
    // Hemco's own brand spine — Sapphire (Hemco Blue) lifted by a sky tint
    // and grounded by a deep navy, exactly as drawn in the brand book.
    accent: "#0852bd",
    accentSoft: "#7ca6dd",
    accentDeep: "#082c6a",
    heroOverlay:
      "radial-gradient(80% 90% at 30% 70%, rgba(8,82,189,0.42) 0%, rgba(8,28,68,0.62) 50%, rgba(4,8,16,0.86) 100%), linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(4,8,16,0.70) 100%)",
    heroAlign: "bottom",
    heroEyebrow: "Engineered for Excellence · Est. 1998",
    heroVideo: "/videos/hemco-kitchens.mp4",
    outcomeLine:
      "A story of steel, fire and vision — engineering kitchens that don't just serve, but inspire.",
    services: [
      {
        label: "Cooking",
        detail:
          "Heavy-duty ranges, combi-ovens, plancha lines and bespoke fire — built and finished in our works in India.",
      },
      {
        label: "Refrigeration & cold chain",
        detail:
          "Walk-ins, blast chillers, undercounter and reach-in units, specified to the kitchen they belong in.",
      },
      {
        label: "Extraction & ventilation",
        detail:
          "Hood, duct, make-up air and fire suppression — engineered for the load, balanced for the room.",
      },
      {
        label: "Stainless fabrication",
        detail:
          "Tables, sinks, shelving, exhibition pieces — sheet stock to finished installation, cut and welded under one roof.",
      },
      {
        label: "Connected kitchen",
        detail:
          "Sensors, dashboards and the data layer that turns the works into a system the chef can run on a tablet.",
      },
    ],
    approach:
      "Over three decades ago, Hemco was born from a simple yet radical belief: that the kitchens powering the world's greatest meals deserved the same innovation and precision as the meals themselves. What started as a pioneering venture became a movement — a relentless pursuit to transform commercial kitchens from functional spaces into engines of performance, creativity and growth.",
    approachContinued:
      "From the heat of the flames to the strength of steel, we found our identity. Fire became Hemco's symbol of passion — raw, untamed, essential. Steel became our embodiment of precision — resilient, exact, enduring. Together they became the foundation of Hemco's philosophy: to engineer kitchens that don't just serve, but inspire. Today the works ships for hotels, cloud kitchens, bakeries and fine-dining restaurants across the subcontinent and beyond, alongside global partners like Electrolux, Rational AG and Unox.",
    motto: "Engineered for Excellence.",
    wordmarkComponent: "hemco",
    pillars: [
      {
        eyebrow: "01 · Steel",
        title: "Precision, resilient and enduring.",
        body: "The embodiment of how we build — exact in tolerance, dependable under load, finished to last decades of nightly service.",
      },
      {
        eyebrow: "02 · Fire",
        title: "Passion, raw and essential.",
        body: "The energy that runs through every line we ship. The kitchens we build are built for the heat of service, by people who respect it.",
      },
      {
        eyebrow: "03 · Vision",
        title: "Engineered for what's next.",
        body: "Connected systems, sustainable manufacturing, and a future-ready posture — Hemco has spent thirty years setting standards others follow.",
      },
    ],
    values: {
      sectionEyebrow: "What we stand on",
      sectionTitle: "Five values, one works.",
      intro:
        "Hemco's values are not posters in the canteen — they are the spec sheet for how the works runs. Each one is testable on the floor, in the audit, and in the kitchens we hand over.",
      items: [
        {
          label: "Engineered Accuracy",
          body: "Precision and performance at every stage — from sheet stock to commissioning.",
        },
        {
          label: "Fearless Innovation",
          body: "Boldly redefining kitchen technology and design, then proving it in service.",
        },
        {
          label: "Dependable by Design",
          body: "Reliability that chefs and businesses can count on, shift after shift.",
        },
        {
          label: "Responsible Craftsmanship",
          body: "Integrating sustainability into materials, energy and the way we build.",
        },
        {
          label: "Partnership in Growth",
          body: "Growing together with operators — as collaborators, not vendors.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "kerning-studio": {
    // Orange-on-black variant — Graphite Black surfaces lit by the brand's
    // Orange-Red emotional accent (the brand book's "Bold & Confident" /
    // "Warm Contrast" combinations). Soft Peach softens the glare on body
    // text where contrast would otherwise feel aggressive.
    bodyTone: "ink",
    accent: "#FF4F2C",
    accentSoft: "#FFB8A7",
    accentDeep: "#a83118",
    // Hero image is the orange-on-black silhouette. Top stays light so
    // the imagery reads; the bottom drops to a heavy pure-black vignette
    // so the hero merges seamlessly into the masked-mark section that
    // follows — the eye reads the two as one continuous canvas.
    heroOverlay:
      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.95) 92%, rgba(0,0,0,1) 100%)",
    heroAlign: "bottom",
    heroEyebrow: "Reducing the space between · India",
    outcomeLine:
      "Design as a strategic lever — reducing the space between vision and execution, between talent and opportunity.",
    services: [
      {
        label: "Brand identity",
        detail:
          "Wordmarks, type systems, palettes, photography direction, the lock-ups that ship for a decade.",
      },
      {
        label: "Editorial & content",
        detail:
          "Magazines, monographs, manifestos, brand books — long-form work for clients who want to be read, not just seen.",
      },
      {
        label: "Digital",
        detail:
          "Sites and product surfaces in the studio's voice. Built in-house, often alongside Kerning AI.",
      },
      {
        label: "Strategy",
        detail:
          "Naming, narrative, market positioning. A small senior team, no boards of juniors.",
      },
      {
        label: "Direction",
        detail:
          "Art direction across photography, film, and exhibition. We brief, we shoot with, we edit.",
      },
    ],
    approach:
      "Kerning is not just a studio. It's a design-led movement that emerged as a rebellion against generic, transactional design. Inspired by the typographic principle of kerning — the act of adjusting space between letters to create harmony — the studio exists to reduce the space between people and ideas, between potential and expression. Founded in the north of India and operating with global standards, Kerning builds more than identities. It builds ecosystems.",
    approachContinued:
      "Unlike traditional agencies focused on volume and execution, Kerning operates at the intersection of strategy, design, and empathy — delivering high-impact, low-volume work that transforms brands from the inside out. The model is a hybrid ecosystem: a sharp in-house core paired with a flexible creative grid, rooted in Tier-2 India and scaled globally. Kerning is not a vendor. It is a strategic partner for visionary founders, CMOs, and businesses that see design as a business advantage, not a decorative afterthought.",
    motto: "Reducing the space between.",
    wordmarkComponent: "kerning",
    pillars: [
      {
        eyebrow: "01 · The space between",
        title: "Empathy as the grid.",
        body: "Every engagement begins by listening — to the founder, the team, the customer the brand is meant to serve. Empathy is the alignment layer; clarity is the goal.",
      },
      {
        eyebrow: "02 · Give it weight",
        title: "Strategy as the system.",
        body: "Design without strategy is decoration. We build identities, editorial systems and digital surfaces that hold up under decades of compounding use.",
      },
      {
        eyebrow: "03 · Add character",
        title: "Craft as the signature.",
        body: "Typography, motion, material, voice — the texture is the thing. Senior hands at every stage; no juniors-on-juniors, no template work.",
      },
    ],
    values: {
      sectionEyebrow: "Voice & tone",
      sectionTitle: "Four values, one studio.",
      intro:
        "Kerning speaks like a strategist, thinks like a designer, and writes like a storyteller. These four qualities define how we show up — in pitch, in product, in copy, in conversation.",
      items: [
        {
          label: "Clear",
          body: "Every sentence has intention. We write to be understood, not to impress — and never to fill space.",
        },
        {
          label: "Sophisticated",
          body: "Approachable yet sharp. Friendly without losing authority — the voice of a senior advisor, not a vendor.",
        },
        {
          label: "Empathetic",
          body: "Articulate, never preachy. We meet clients and audiences where they are, then move with them.",
        },
        {
          label: "Visionary",
          body: "Calm confidence. We avoid hype, embrace clarity, and let the long view do the heavy lifting.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "kerning-ai": {
    bodyTone: "forest",
    accent: "#d4b773",
    accentSoft: "#e4cf9a",
    accentDeep: "#8a6a2c",
    heroOverlay:
      "linear-gradient(180deg, rgba(8,12,18,0.30) 0%, rgba(8,12,18,0.55) 50%, rgba(5,8,14,0.92) 100%), radial-gradient(40% 60% at 80% 20%, rgba(212,183,115,0.10) 0%, transparent 70%)",
    heroAlign: "bottom",
    heroEyebrow: "AI & Automation · Operational intelligence",
    heroVideo: "/videos/kerning-ai.mp4",
    outcomeLine:
      "An operational intelligence platform for industries that build with their hands — an ontology-led approach to Industry 5.0, retuned for the Indian floor.",
    services: [
      {
        label: "Operational ontology",
        detail:
          "A living model of the operation — equipment, lines, recipes, people, vendors, regulations — fused from sensors, machine telemetry, ERP, BMS, POS, HR and the operator's own voice. Not a dashboard. An object graph the whole company can reason on.",
      },
      {
        label: "Agentic workflows",
        detail:
          "Reasoning agents that act on the ontology — flag a failing combi oven before service, re-route a chiller load when grid tariffs spike, draft an FSMS variance back to the QA lead. Humans approve; the agent does the boring work.",
      },
      {
        label: "Predictive maintenance",
        detail:
          "Industrial-grade telemetry on assets running sixteen-hour shifts. Bearings, compressors, hoods, robotic cells — failure modes called weeks before service stops.",
      },
      {
        label: "Energy, utility & emissions",
        detail:
          "Real-time tracking of power, gas, water, refrigerant — with automated tariff optimisation, scope-2 carbon ledgering, and bill-reduction targets the CFO can audit.",
      },
      {
        label: "Hygiene, safety & compliance",
        detail:
          "Digital audits, temperature logs, FSMS / ISO / GMP workflows — replacing the clipboard with a tablet that knows what to ask, when to escalate, and how to close the loop.",
      },
      {
        label: "Decision intelligence",
        detail:
          "Plate-level P&L, line-level efficiency, brigade-level performance — modelled on the ontology, served as decisions rather than reports.",
      },
    ],
    approach:
      "Kerning AI is a horizontal operational-intelligence platform built for industries that make things in the physical world — kitchens, factories, hotel floors, automotive cells. Founded in 2021, the company runs on a single thesis: that the leverage point in a real-world operation isn't a chatbot or a dashboard — it's an ontology. A single, governed, living model of the operation, fused from every sensor, every ERP row and every shift-handover note, on top of which agents and humans can reason about the same reality. It's the same idea that has lifted the world's most consequential industrial software a decade ahead of its peers; we're rebuilding it for the floors that have been left behind.",
    approachContinued:
      "We started inside our own works, because Hemco was the first customer with the problem in volume — hundreds of commercial kitchens in service, equipment failing silently, power being paid for and not produced, compliance lapses caught in the audit instead of the moment. We built the ontology, layered the agents on top, and shipped it. Operators we knew asked for it; manufacturers we'd never met asked for it; now Kerning AI is the operating intelligence under hospitality groups, manufacturers, and institutional F&B operators across India, the EU and the UK.",
    approachExtra:
      "What we are building is Industry 5.0 software, not Industry 4.0 software. Industry 4.0 was about automation — sensors, robots, machines wired together to remove the human. Industry 5.0 puts the human back: the chef, the line lead, the maintenance engineer, the brigade trainer, the CFO. Our agents work alongside them, with full audit trails of every decision, instead of against them. The platform is multilingual by default, runs sovereign-deployed where the customer needs it, and treats the front-line operator's tacit knowledge as a first-class data source — not as a target to be optimised away.",
    motto: "Industry 5.0, on the floor.",
    wordmarkComponent: "kerning-ai",
    pillars: [
      {
        eyebrow: "01 · Ontology",
        title: "One model of the operation.",
        body: "Equipment, recipes, people, suppliers, regulations — fused into a single object graph the whole company can reason on. The leverage point in a real-world operation, rebuilt for the Indian floor.",
      },
      {
        eyebrow: "02 · Agents",
        title: "Reasoning, not reporting.",
        body: "Agentic workflows on the ontology that act, not just alert. Predictive maintenance, energy optimisation, compliance closure, plate-level P&L — humans approve, the agent does the work.",
      },
      {
        eyebrow: "03 · Human-centric",
        title: "Industry 5.0, by design.",
        body: "Built to work alongside the operator, not over them. Multilingual, sovereign-deployable, audit-trailed by default. The line lead's tacit knowledge is a first-class data source — not a target.",
      },
    ],
    values: {
      sectionEyebrow: "What 5.0 means here",
      sectionTitle: "Six commitments of the platform.",
      intro:
        "Industry 5.0 is not a marketing slogan; it is a working contract. These are the six commitments Kerning AI makes to every customer's floor, every audit, and every front-line operator who has to live with the software we ship.",
      items: [
        {
          label: "Human-in-the-loop",
          body: "Agents propose; humans dispose. Every consequential action is approved by a named person, with a recorded reason, traceable later in the audit.",
        },
        {
          label: "Augment, don't replace",
          body: "We automate the boring work — clipboard logs, manual reads, paperwork — so the work that requires a human can keep its human.",
        },
        {
          label: "Sovereign by default",
          body: "Customer data resides in the customer's jurisdiction. Air-gapped, on-prem, or sovereign-cloud installations available without a sales-engineering call.",
        },
        {
          label: "Resilient operations",
          body: "The platform degrades gracefully — losing a sensor, a model, or an internet link doesn't stop the line. The operator's clipboard keeps working.",
        },
        {
          label: "Sustainable as standard",
          body: "Energy, water, gas and refrigerant are first-class signals — not a CSR-team add-on. Scope-2 carbon ledgering ships in the base product.",
        },
        {
          label: "Multilingual on the floor",
          body: "The line lead reads Hindi, the chef reads Tamil, the CFO reads English. The platform speaks all of them — and the language a workflow runs in is the operator's choice, not ours.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  consortium: {
    bodyTone: "ink",
    accent: "#8a7a5e",
    accentSoft: "#b09e7c",
    accentDeep: "#3a3225",
    heroOverlay:
      "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 40%, rgba(5,5,8,0.95) 100%), radial-gradient(50% 70% at 50% 30%, rgba(138,122,94,0.12) 0%, transparent 80%)",
    heroAlign: "bottom",
    heroEyebrow: "Decision intelligence · Upcoming",
    heroVideo: "/videos/consortium.mp4",
    outcomeLine:
      "Mission software and decision intelligence — built in India, for the institutions that run it.",
    services: [
      {
        label: "Data fusion",
        detail:
          "Integrating disparate sensor, signal and ledger streams into a single operational picture.",
      },
      {
        label: "Operational analytics",
        detail:
          "Time-series, geospatial and event-stream analytics tuned to government and enterprise scale.",
      },
      {
        label: "Mission software",
        detail:
          "Workflow surfaces for command, dispatch, audit and after-action — designed alongside the operators using them.",
      },
      {
        label: "Sovereign deployment",
        detail:
          "Air-gapped, on-prem and sovereign-cloud installations. Indian-data-resident by default.",
      },
    ],
    approach:
      "Consortium is the group's emerging decision-intelligence venture — a sister company to Kerning AI, sharing engineering DNA but pointed at a different customer. Where Kerning AI works in hospitality and the operations of private business, Consortium works with Indian enterprise and government institutions: ministries, regulators, public-sector enterprises, and the large industrial groups that operate at the scale of countries.",
    approachContinued:
      "The thesis is simple. The next decade of Indian institutional life will be defined by the quality of the decisions its operators make under uncertainty. Those decisions deserve software built in India, by people who understand the constraints of the country — and who can be trusted with the data the systems run on. Consortium is being built for that brief. The team is forming; the first product surfaces are in design.",
    motto: "Decision intelligence, built in India.",
    wordmarkComponent: "consortium",
    pillars: [
      {
        eyebrow: "01 · Fusion",
        title: "One picture from many signals.",
        body: "Sensors, ledgers, telemetry, satellite, transactional and human reports — fused into a single operational picture the institution can reason on, not a slide deck refreshed quarterly.",
      },
      {
        eyebrow: "02 · Mission",
        title: "Software for the call sheet.",
        body: "Command, dispatch, audit, after-action — workflow surfaces designed alongside the operators using them. The product fits the way the institution already runs, instead of asking it to change first.",
      },
      {
        eyebrow: "03 · Sovereign",
        title: "Indian data, Indian custody.",
        body: "Air-gapped, on-prem, or sovereign-cloud — the customer chooses. Code, models and data residency stay inside the jurisdiction that legally owns the decision.",
      },
    ],
    values: {
      sectionEyebrow: "Operating principles",
      sectionTitle: "Five rules of engagement.",
      intro:
        "Consortium serves institutions where the decisions matter, the data is sensitive and the failure modes have consequences. These five principles are the engagement contract — the things the firm holds to before, during, and after the deployment.",
      items: [
        {
          label: "Operator-led product",
          body: "Every workflow is co-designed with the people who will run it on shift. The product reflects the operator's vocabulary and rhythm, not the vendor's roadmap.",
        },
        {
          label: "Sovereign by default",
          body: "Customer data resides in the customer's jurisdiction. Indian-data-resident installations are the default, not an enterprise upcharge.",
        },
        {
          label: "Audit-ready always",
          body: "Every consequential action carries a recorded reason and a named actor. The audit trail is part of the product, not a tab buried in settings.",
        },
        {
          label: "Resilient by construction",
          body: "The platform degrades gracefully. Losing a feed, a model, or an external dependency doesn't stop the institution from running.",
        },
        {
          label: "Quiet delivery",
          body: "Consortium speaks through deliveries, not press. References are by introduction, after the system has run for a year inside the institution.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  lumonn: {
    // Lumonn brand spine — deep electric blue against an ink canvas, as
    // shown in the device imagery (the LENR module on the cobalt-lit
    // pedestal). The accent stays cool and luminous; the deep navy
    // grounds the page.
    bodyTone: "ink",
    accent: "#3a78ff",
    accentSoft: "#7aa6ff",
    accentDeep: "#142a6e",
    // Hero overlay leans into the brand's signature look: a focused
    // electric-blue glow centred low, fading out to deep navy / black.
    // Lighter scrim so the fractal-glass hero video reads bright. Just
    // enough cobalt at the bottom to keep the LUMONN wordmark legible.
    heroOverlay:
      "linear-gradient(180deg, rgba(4,8,18,0) 0%, rgba(4,8,18,0.05) 50%, rgba(4,8,18,0.42) 100%), radial-gradient(70% 60% at 50% 100%, rgba(58,120,255,0.10) 0%, transparent 70%)",
    heroAlign: "bottom",
    heroEyebrow: "LENR · Advanced science · Real-world impact",
    heroVideo: "/videos/lumonn.mp4",
    outcomeLine:
      "A high-impact LENR module — endless energy, in a unit small enough to live at the edge of the grid.",
    services: [
      {
        label: "LENR core",
        detail:
          "A solid-state Low Energy Nuclear Reactor module built on metallic-lattice physics — high specific power, zero combustion, no long-lived nuclear waste.",
      },
      {
        label: "Module form factor",
        detail:
          "A reactor sized like a piece of laboratory equipment, not a power station. Single-room install, hot-swappable cartridges, designed for distributed deployment.",
      },
      {
        label: "Edge-grid power",
        detail:
          "Continuous heat and electrical output for industrial sites, campuses, data halls and remote communities — independent of the central grid, unaffected by tariff cycles.",
      },
      {
        label: "Inherent safety",
        detail:
          "No critical mass, no runaway pathway, no high-pressure containment. The safety case is structural, not procedural — the device cannot fail open.",
      },
      {
        label: "Material science",
        detail:
          "Lattice engineering, hydrogen loading, transition-metal stack design — the physics that turns the brand-book promise of \"endless energy\" into a controlled, repeatable thermal output.",
      },
      {
        label: "Pilot programme",
        detail:
          "First-of-a-kind sites under design with industrial partners. Targeted commissioning toward the end of the decade; the public release waits on data, not press.",
      },
    ],
    approach:
      "Lumonn is the group's most ambitious bet — a research-stage clean-energy company building a Low Energy Nuclear Reactor (LENR) module the size of a piece of laboratory equipment. The thesis is direct: the world does not need another grid-scale plant five decades out; it needs a unit small enough to be installed inside an existing facility, modular enough to be replicated, and safe enough to live next to the people it powers. LENR is the physics that lets that be true.",
    approachContinued:
      "Where conventional fission needs vast containment and conventional fusion needs the temperatures of the sun, LENR sits at the lattice scale — heat liberated from solid-state nuclear interactions inside a hydrogen-loaded transition-metal stack, at temperatures and pressures the engineering profession already knows how to build for. The science has matured quietly across NASA, ENG-Italy, Mitsubishi, and a small set of Indian and European labs. Lumonn's bet is that India is the right place to commercialise it: sovereign manufacturing depth, high industrial energy demand, a regulatory environment ready for a new category, and a customer base that needs distributed clean baseload now, not in 2050.",
    approachExtra:
      "We are honest about the scale of the challenge. Reactor companies are written about long before they ship — Lumonn's commitment is the opposite. We are heads-down on the engineering, the materials, and the licensing pathway, and we will speak publicly only when the first module's output is independently measured. Until then, the company is a tight team of physicists, materials engineers, regulatory specialists and manufacturing veterans, working out of a research facility in India, supported by the rest of the group's metal and electronics depth. Endless energy is not a slogan for us. It is a calibration target.",
    motto: "Endless energy. The future is today.",
    wordmarkComponent: "lumonn",
    pillars: [
      {
        eyebrow: "01 · Science",
        title: "Lattice physics, not legacy fission.",
        body: "Solid-state nuclear interactions at the metallic-lattice scale — no critical mass, no long-lived waste, no high-temperature plasma. The whole safety case follows from the physics, not from the procedure manual.",
      },
      {
        eyebrow: "02 · Engineering",
        title: "Reactor as a piece of equipment.",
        body: "A module sized like laboratory hardware — single-room install, hot-swappable cartridges, manufacturable inside the group's existing works. The reactor fits the building, not the other way around.",
      },
      {
        eyebrow: "03 · Edge",
        title: "Power where the grid ends.",
        body: "Distributed clean baseload for industrial sites, campuses and remote communities. Independent of central transmission, unaffected by fuel imports — and continuous, the way real operations need it.",
      },
    ],
    values: {
      sectionEyebrow: "What endless means here",
      sectionTitle: "Six commitments of the programme.",
      intro:
        "Lumonn is a frontier company. These commitments are the contract — what we hold to before there is a product, during the engineering build, and after the first independently-measured module ships. They are how we earn the right to use the word \"endless\" without inverted commas.",
      items: [
        {
          label: "Data before press",
          body: "We do not announce performance. We commission third-party measurement and publish the report — and only then do we speak in public.",
        },
        {
          label: "Inherent safety",
          body: "The safety case is structural, not procedural. The device's failure modes are bounded by physics, not by an operator following a checklist.",
        },
        {
          label: "Sovereign supply",
          body: "Materials, electronics, lattice substrates and assembly inside the country. No foreign dependencies on the critical path of a strategic energy programme.",
        },
        {
          label: "Modular by design",
          body: "Power scales by adding modules, not by building a bigger plant. Pilot sites compose into industrial-scale capacity without redesigning the unit.",
        },
        {
          label: "No-waste cycle",
          body: "Spent cartridges are recoverable, not radioactive in any conventional sense. End-of-life is recycling, not geological storage.",
        },
        {
          label: "Long-horizon team",
          body: "Physicists, materials engineers, licensing veterans and manufacturing leads — hired for the decade, not the funding round. The roster grows with the programme, not with the news cycle.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  keystonne: {
    // Keystonne's brand spine — Sapphire Navy as the primary anchor,
    // lifted by a steel-blue glint and grounded in deep midnight. The
    // brand book also runs Forest Green and Gold as secondary tones;
    // those surface in the page treatment rather than the accent slot.
    bodyTone: "ink",
    accent: "#2A3D66",
    accentSoft: "#7c9cc4",
    accentDeep: "#141d33",
    // Stone-slab hero — heavy bottom vignette in midnight blue so the
    // page bleeds straight into the stone-mark section that follows.
    heroOverlay:
      "linear-gradient(180deg, rgba(8,12,22,0.30) 0%, rgba(8,12,22,0.55) 50%, rgba(6,9,17,0.92) 92%, #06090f 100%), radial-gradient(60% 70% at 30% 70%, rgba(42,61,102,0.22) 0%, transparent 65%)",
    heroAlign: "bottom",
    heroEyebrow: "Hospitality marketplace · Est. 2024",
    outcomeLine:
      "India's first end-to-end hospitality marketplace — and a value-engineered Keystonne kitchen line, built by Hemco for operators who need Hemco-grade reliability at an entry price point.",
    services: [
      {
        label: "Keystonne Kitchen",
        detail:
          "Our own value-engineered commercial kitchen line — cooking, refrigeration and stainless fabrication, manufactured by Hemco at an entry price point without compromising the spec sheet.",
      },
      {
        label: "Equipment marketplace",
        detail:
          "Hundreds of trusted partner brands across cooking, refrigeration, ware-washing and ventilation — one catalogue, one PO, one delivery.",
      },
      {
        label: "Smallwares & consumables",
        detail:
          "Prep tools, service ware, knife rolls, cleaning chemistry, papers and gloves — the long tail of the back-of-house, in stock and shipped by the kilo.",
      },
      {
        label: "Pan-India logistics",
        detail:
          "Own warehouses across the subcontinent, scheduled installation crews, and 48-hour delivery on the catalogue's fast-moving lines.",
      },
      {
        label: "Trade accounts",
        detail:
          "Procurement portals for hotel groups, chains and institutional buyers — with credit terms, GST billing and full order history.",
      },
    ],
    approach:
      "Keystonne is the catalogue side of the works — India's first end-to-end hospitality marketplace, modelled on what WebstaurantStore did for the United States. After two decades of building kitchens for hotels and restaurants across the subcontinent, we kept being asked the same question: where does an operator buy the rest of what they need — the smallwares, the consumables, the replacement parts, the second commercial fryer for the second outlet — without spending a week chasing fifty suppliers? The answer in India was nowhere. So we built it.",
    approachContinued:
      "Alongside the marketplace, Keystonne runs its own value-engineered commercial kitchen line — manufactured inside Hemco's works in India and priced for the operators who can't yet write a Hemco-flagship cheque. Same steel, same fire-safety engineering, same after-sales: a deliberately tighter catalogue at an entry price point. The marketplace is Keystonne's WebstaurantStore play; the Keystonne Kitchen line is the house brand inside it. Behind both sits Hemco's twenty-eight-year reputation in the kitchen industry, and the rest of the group's manufacturing depth.",
    motto: "Everything the commercial kitchen needs, in one place.",
    wordmarkComponent: "keystonne",
    pillars: [
      {
        eyebrow: "01 · Catalogue",
        title: "One marketplace, the whole back-of-house.",
        body: "Equipment, smallwares, consumables, replacement parts — pan-India in stock, GST-billed, trade-accountable. The buying side of running a hospitality business, finally on one screen.",
      },
      {
        eyebrow: "02 · Kitchen line",
        title: "Hemco-grade, entry price.",
        body: "Our own value-engineered commercial kitchen line — manufactured inside Hemco's works for operators who need the reliability without the flagship price tag.",
      },
      {
        eyebrow: "03 · Logistics",
        title: "Pan-India, owned end-to-end.",
        body: "Own warehouses across the subcontinent, scheduled installation crews, 48-hour delivery on fast-movers. Not a marketing claim — the trucks are ours.",
      },
    ],
    values: {
      sectionEyebrow: "How the marketplace runs",
      sectionTitle: "Five operating principles.",
      intro:
        "Keystonne sits between the works and the operator. The principles below are the contract: what an operator who sets up a trade account with us can expect, every cycle, on every line item.",
      items: [
        {
          label: "In stock or honest about it",
          body: "Catalogue stock-state is real-time, not aspirational. If a line says 48-hour, it ships in 48 hours.",
        },
        {
          label: "One PO, one invoice",
          body: "A full kitchen's worth of ware can land on a single purchase order, on a single GST-compliant bill — instead of forty.",
        },
        {
          label: "Trade-priced",
          body: "Keystonne is built for buyers who buy weekly. Pricing reflects that — published, transparent, and better than the bazaar.",
        },
        {
          label: "Hemco-backed",
          body: "Every Keystonne Kitchen line product carries Hemco's after-sales. The marketplace lines carry the manufacturer's plus our coordination.",
        },
        {
          label: "Operator-grade installation",
          body: "Our installation crews are kitchen-trained, not generalists. The first service is part of the order, not a separate bill.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "consortium-defence-robotics": {
    bodyTone: "ink",
    accent: "#7e8895",
    accentSoft: "#a8b3c1",
    accentDeep: "#3a3f47",
    heroOverlay:
      "linear-gradient(180deg, rgba(8,10,14,0.50) 0%, rgba(5,7,10,0.65) 40%, rgba(3,4,6,0.95) 100%), radial-gradient(40% 50% at 50% 50%, rgba(126,136,149,0.10) 0%, transparent 80%)",
    heroAlign: "bottom",
    heroEyebrow: "Defence & robotics · Sovereign",
    heroVideo: "/videos/consortium-defence.mp4",
    wordmarkComponent: "consortium",
    outcomeLine:
      "Sovereign defence manufacturing for the Indian forces — precision munitions, autonomous systems, and the software that commands them.",
    services: [
      {
        label: "Precision munitions",
        detail:
          "Sub-systems and complete rounds for the Indian Armed Forces, manufactured to NATO-equivalent QA.",
      },
      {
        label: "Unmanned aerial systems",
        detail:
          "Indigenously designed UAS platforms for surveillance, decision support and strike. Made in India.",
      },
      {
        label: "Unmanned ground systems",
        detail:
          "Autonomous and tele-operated ground vehicles for logistics and forward-edge operations.",
      },
      {
        label: "Command & control software",
        detail:
          "Mission software for fleet command — tightly integrated with Consortium's decision-intelligence stack.",
      },
      {
        label: "Indigenous supply chain",
        detail:
          "Materials, electronics and assembly inside the country. No foreign dependencies on the critical path.",
      },
    ],
    approach:
      "Consortium Defence & Robotics — CDR — is the group's defence venture, set up around a single thesis: India's defence-industrial base needs sovereign manufacturers at the intersection of metal and software, run by people who can ship both. The country has world-class system integrators and excellent fabricators, but the gap between them — the ability to design, build and command an autonomous platform end-to-end inside India — has been thin. CDR is being built to close it.",
    approachContinued:
      "The company is in its incorporation and capability-build phase. Initial programmes focus on precision munitions sub-systems and on small unmanned aerial and ground platforms, with an autonomous-command software layer developed in concert with our sister company Consortium. CDR will manufacture from the works in India, using the group's metal and electronics depth, and will operate on a publicly-quiet, customer-led basis — speaking through deliveries rather than press.",
    motto: "Quiet manufacturing. Sovereign systems.",
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "kerning-hospitality": {
    bodyTone: "warm-ivory",
    accent: "#8a3a2e",
    accentSoft: "#b05a4a",
    accentDeep: "#5a221a",
    heroOverlay:
      "linear-gradient(180deg, rgba(28,12,8,0.35) 0%, rgba(28,12,8,0.45) 40%, rgba(20,8,5,0.82) 100%), radial-gradient(60% 70% at 70% 70%, rgba(176,90,74,0.15) 0%, transparent 70%)",
    heroAlign: "bottom",
    heroEyebrow: "Hospitality · Consultancy",
    heroVideo: "/videos/kerning-hospitality.mp4",
    outcomeLine:
      "End-to-end hospitality consultancy — kitchen design through to opening night.",
    services: [
      {
        label: "Kitchen & service design",
        detail:
          "Layouts, flow, equipment specification, fire and ventilation — drawn alongside the chef.",
      },
      {
        label: "Menu engineering",
        detail:
          "Food-cost models, plate-level P&L, recipe standardisation, supplier reviews.",
      },
      {
        label: "Operations setup",
        detail:
          "SOPs, opening checklists, training manuals, FSMS and audit-ready compliance documentation.",
      },
      {
        label: "On-site training",
        detail:
          "Brigade build-outs, line training, service walk-throughs, soft-opening support.",
      },
      {
        label: "Brand & narrative",
        detail:
          "With Kerning Studio: identity, menu design, photography, the surfaces guests actually meet.",
      },
    ],
    approach:
      "Kerning Hospitality is the group's culinary and hospitality consultancy — built so that operators can engage one team for the entire arc of opening a restaurant, hotel F&B programme, or institutional kitchen. From kitchen design and equipment specification, through menu engineering and food-cost modelling, into operations setup, training, and finally the soft opening — the practice covers every step that historically required four different vendors who do not speak to each other.",
    approachContinued:
      "Behind the consultancy sits the rest of the house: Hemco for the kitchen build, Keystonne for the supply, Kerning Studio for the brand and menu design, Kerning AI for the operations data layer. Operators get senior advice from a single firm and the manufacturing and service infrastructure to actually deliver on it. The practice is currently scoped to the Indian market but is being built for export.",
    motto: "Culinary consulting, end to end.",
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "kerning-architecture": {
    // Warm-ivory canvas — the colour of cartridge paper on a drafting table.
    // Olive-bronze accent reads as a draughtsman's pencil mark or a
    // patinated bronze door pull. Deep umber for the dark fills.
    bodyTone: "warm-ivory",
    accent: "#7a6e3e",
    accentSoft: "#a89868",
    accentDeep: "#3a3320",
    // Hero overlay: very quiet. The image stays readable; a warm wash
    // pulls the photo toward the page's ivory tone so the type sits
    // confidently without fighting the photograph.
    heroOverlay:
      "linear-gradient(180deg, rgba(28,24,16,0.18) 0%, rgba(28,24,16,0.32) 50%, rgba(20,16,10,0.72) 100%), radial-gradient(60% 70% at 25% 80%, rgba(168,152,104,0.10) 0%, transparent 70%)",
    heroAlign: "bottom",
    heroEyebrow: "Architecture · Interiors · A+D practice",
    heroVideo: "/videos/kerning-architecture.mp4",
    outcomeLine:
      "Architecture and interiors built around the rooms a guest actually walks through — drawn in-house, detailed in person, and stayed through to handover.",
    services: [
      {
        label: "Architecture",
        detail:
          "Hospitality, cultural and institutional buildings — from feasibility and brief through to occupation. New-build and adaptive reuse, both.",
      },
      {
        label: "Interior architecture",
        detail:
          "Restaurants, hotel public realm, retail, civic interiors. The rooms guests measure the brand by — designed at 1:1 scale, detailed at 1:5.",
      },
      {
        label: "Material direction",
        detail:
          "Stone, lime plaster, oiled wood, hand-finished metal. Sourced from quarry, lime-pit and forge — and signed off on the sample table, in person.",
      },
      {
        label: "Daylight, light & atmosphere",
        detail:
          "Daylight studies, integrated lighting, acoustic detailing, soft furnishing. The qualities of a room you can't draw on a plan.",
      },
      {
        label: "Built coordination",
        detail:
          "Alongside Hemco for the kitchen, Kerning Hospitality for the operation, Kerning Studio for the wayfinding. One coordinated set of drawings — instead of four.",
      },
    ],
    approach:
      "Kerning Architecture & Design is the group's architecture and interior practice — small, partner-led, and set up so the building, the kitchen, and the room a guest actually sits in arrive as one coordinated work, instead of three contractors meeting on site for the first time. We work in soft pencil before we work in software: the briefs are interrogated, the rooms are walked, the materials are sourced and held in the hand before they make it onto a sample board.",
    approachContinued:
      "Most of our work is in hospitality, cultural and adaptive-reuse projects, where there is a kitchen or a programme at the centre and an experience around it. We design the building, draw the millwork, specify the materials, and stay through the build alongside Hemco and Kerning Hospitality. The practice deliberately takes fewer projects than it is offered — architecture, like the kitchen it shelters, reads cleanly only when it has been thought about for long enough.",
    motto: "Architecture, drawn in soft pencil.",
    wordmarkComponent: "kerning",
    pillars: [
      {
        eyebrow: "01 · Brief",
        title: "Walked, not received.",
        body: "Every project begins on site, in conversation. The brief we write back is shorter than the one we received, and harder to disagree with.",
      },
      {
        eyebrow: "02 · Material",
        title: "Held before it's drawn.",
        body: "Stone from the quarry, lime from the pit, wood with a grain we can read. Materials are signed off in person, on a sample table — not in a swatch book.",
      },
      {
        eyebrow: "03 · Build",
        title: "Stayed through to handover.",
        body: "We are on site through construction, alongside Hemco and Kerning Hospitality. The drawing set is not abandoned at tender — it is the room.",
      },
    ],
    values: {
      sectionEyebrow: "Working principles",
      sectionTitle: "Five rules of the studio.",
      intro:
        "These are the working rules — what we expect of a project before we take it on, and what a client can expect of us once we have. They are how we keep the practice small without letting the standard slip.",
      items: [
        {
          label: "One studio, one drawing set",
          body: "Architecture, interiors, joinery, lighting — coordinated by the studio, not handed off to subcontractors who never meet.",
        },
        {
          label: "Material before mood-board",
          body: "We sample stone, plaster, wood and metal before we paint the renderings. The material decides the room, not the other way around.",
        },
        {
          label: "Soft pencil first",
          body: "Hand sketches and physical models lead the early stage. Software comes once the proportions and the section feel right.",
        },
        {
          label: "On site through construction",
          body: "The drawings are revised on site, with the trades. The studio principal is at every milestone — not the marketing material's principal, the actual one.",
        },
        {
          label: "Fewer projects, taken longer",
          body: "We turn down more work than we accept. Each project gets the studio's full attention for the calendar year it deserves.",
        },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "cronuss-associates": {
    bodyTone: "ivory",
    accent: "#1e2a3a",
    accentSoft: "#3a4a5e",
    accentDeep: "#10182a",
    heroOverlay:
      "linear-gradient(180deg, rgba(8,12,20,0.35) 0%, rgba(8,12,20,0.50) 50%, rgba(5,8,14,0.85) 100%), radial-gradient(55% 60% at 50% 30%, rgba(58,74,94,0.10) 0%, transparent 75%)",
    heroAlign: "bottom",
    heroEyebrow: "Legal · Corporate counsel",
    outcomeLine:
      "Counsel for builders — corporate, regulatory, and commercial law for the people who make things.",
    services: [
      {
        label: "Corporate transactions",
        detail:
          "M&A, joint ventures, fund raises, group restructuring — across the group's industries and beyond.",
      },
      {
        label: "Regulatory advisory",
        detail:
          "FEMA, GST, sectoral regulators, and compliance frameworks for industrial businesses.",
      },
      {
        label: "Commercial counsel",
        detail:
          "Vendor and customer contracts, IP, manufacturing agreements, technology licensing.",
      },
      {
        label: "Group secretarial",
        detail:
          "Board, statutory and governance work for closely-held industrial groups.",
      },
      {
        label: "Disputes",
        detail:
          "Selectively, where the matter is core to the client's business and we can serve it well.",
      },
    ],
    approach:
      "Cronuss Associates is the group's law firm — set up to serve the way the rest of the house actually operates. The brief was specific. We wanted counsel who understood that an industrial group does not need a deck of partners on every email; that contracts should be readable; and that the value of a lawyer compounds when the same person has been at every transaction for a decade. Cronuss was built around that.",
    approachContinued:
      "The firm advises on corporate, regulatory and commercial matters across the group's industries — manufacturing, hospitality, technology, defence — and takes on a small number of external clients in similar shape. It does not pitch on RFPs. The practice is partner-led, written advice is standard, and the firm's senior counsel are reachable on the phone.",
    motto: "Counsel for builders.",
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "mvv-foundation": {
    bodyTone: "warm-ivory",
    accent: "#2e5a3a",
    accentSoft: "#4a7a56",
    accentDeep: "#1a3a24",
    heroOverlay:
      "linear-gradient(180deg, rgba(12,20,14,0.30) 0%, rgba(12,20,14,0.42) 50%, rgba(8,14,10,0.80) 100%), radial-gradient(55% 60% at 30% 70%, rgba(74,122,86,0.18) 0%, transparent 70%)",
    heroAlign: "bottom",
    heroEyebrow: "Foundation · Philanthropy",
    outcomeLine:
      "Education, culinary skilling, and the communities that taught us how to cook.",
    services: [
      {
        label: "Culinary skilling",
        detail:
          "Apprentice-style training programmes for cooks, kitchen technicians, and back-of-house teams from underserved communities.",
      },
      {
        label: "Education",
        detail:
          "Scholarships, school partnerships, and infrastructure support in the towns where Hemco ventures operate.",
      },
      {
        label: "Community kitchens",
        detail:
          "Public-feeding kitchens at scale, designed and supplied by Hemco at cost.",
      },
      {
        label: "Civic partnerships",
        detail:
          "Working with local government and trusts on long-horizon programmes — twenty-year, not one-year.",
      },
    ],
    approach:
      "The MVV Foundation is the philanthropic arm of the group, named for the founder's mother and run as a long-horizon practice rather than a charitable wing. Its remit is straightforward: return what we have learned to the city that taught us. That has translated, in practice, to culinary skilling for cooks and kitchen technicians from underserved communities; to scholarship support and school partnerships in the towns where Hemco operates; and to community kitchens designed and supplied at cost by the works.",
    approachContinued:
      "The foundation does not seek public capital and does not run grant rounds. It is funded by a fixed share of the group's distributable surplus and by directed contributions from the founders. Programmes are designed and run with on-the-ground partners rather than from a distance. The expectation is that any one programme runs for two decades or longer.",
    motto: "Returning what we've learned to the city that taught us.",
  },
};

/** Fallback identity used if a venture has no entry — should never happen. */
export const defaultIdentity: VentureIdentity = {
  bodyTone: "ivory",
  accent: "#c8a55b",
  accentSoft: "#e4cf9a",
  accentDeep: "#6b4f1b",
  heroOverlay:
    "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.90) 100%)",
  heroAlign: "bottom",
  heroEyebrow: "Hemco Group",
  outcomeLine: "",
  services: [],
  approach: "",
};
