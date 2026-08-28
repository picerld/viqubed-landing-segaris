export interface Solution {
  slug: string
  title: string
  eyebrow: string
  shortDescription: string
  overviewTitle: string
  overview: string
  gradient: string
  imgurl: string
}

export const solutions: Solution[] = [
  {
    slug: "automotive",
    title: "Automotive Solution",
    eyebrow: "Automotive Engineering",
    shortDescription:
      "Provides hands-on virtual training in vehicle engineering — from assembly and testing to chassis, engine, and transmission handling.",
    overviewTitle: "Heavy Equipment Powertrain & Engine Assembly",
    overview:
      "The automotive industry is a major industrial sector that requires a significant amount of technical understanding and expertise in the engineering of vehicles — from assembly and testing to maintenance handling. This requires skilled professionals with expertise in areas such as vehicle chassis, engines, electrical control systems, and transmission mechanics.",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    imgurl: "/img/Arsitektur.png",
  },
  {
    slug: "aviation",
    title: "Aviation Solution",
    eyebrow: "Aviation Engineering",
    shortDescription:
      "Provides hands-on virtual training in aircraft systems — from assembly and testing to airframe, engine, and avionics handling.",
    overviewTitle: "Aircraft Systems & Avionics Training",
    overview:
      "Aviation maintenance and engineering demand precise, repeatable training on systems that are too costly or dangerous to practice on directly. Interactive 3D breakdowns let trainees rotate, disassemble, and inspect airframes, engines, and avionics bays without grounding a single aircraft.",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    imgurl: "/img/Aviation.png",
  },
  {
    slug: "medical",
    title: "Medical Solution",
    eyebrow: "Medical Education",
    shortDescription:
      "Replaces textbook diagrams with fully rotatable biological models, layer-by-layer disassemblies, and interactive clinical hotspots.",
    overviewTitle: "Anatomy & Clinical Simulation",
    overview:
      "Static diagrams struggle to convey depth, layering, and spatial relationships in the human body. VIQUBED turns flat illustrations into fully rotatable, dissectible anatomical models with clinical hotspots students can explore at their own pace.",
    gradient: "from-rose-500 via-pink-500 to-red-600",
    imgurl: "/img/Human_Body.png",
  },
  {
    slug: "engineering",
    title: "Engineering Solution",
    eyebrow: "Mechanical Engineering",
    shortDescription:
      "Eliminates steep CAD software learning curves with live stress visualizations, exploded mechanical views, and assembly guides.",
    overviewTitle: "Mechanical Assembly & Stress Visualization",
    overview:
      "Engineering teams lose time onboarding new hires onto heavyweight CAD tools. By publishing pre-built interactive models with exploded views and guided assembly steps, VIQUBED shortens the path from CAD file to shared understanding.",
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    imgurl: "/img/Bearing.png",
  },
  {
    slug: "industrial",
    title: "Industrial Solution",
    eyebrow: "Industrial Operations",
    shortDescription:
      "Deploy interactive digital twins directly inside web browsers for machine maintenance, production workflows, and hazard simulations.",
    overviewTitle: "Digital Twins for Maintenance & Safety",
    overview:
      "Factory floors are high-stakes environments where training mistakes are costly. Browser-based digital twins let operators rehearse maintenance procedures and hazard responses safely, before ever touching the real machine.",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    imgurl: "/img/CFM.png",
  },
  {
    slug: "electrical",
    title: "Electrical Solution",
    eyebrow: "Electrical Systems",
    shortDescription:
      "Transforms abstract schematics into rotatable component assemblies, step-by-step wiring guides, and fault-finding simulations.",
    overviewTitle: "Wiring, Circuits & Fault Diagnosis",
    overview:
      "Electrical schematics are notoriously hard to translate into physical intuition. VIQUBED renders wiring harnesses and control panels as manipulable 3D assemblies, complete with guided fault-finding simulations for technician training.",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    imgurl: "/img/Piston.png",
  },
  {
    slug: "product-design",
    title: "Product Design Solution",
    eyebrow: "Product Design",
    shortDescription:
      "Share 3D product design concepts with team members and board directors, equipped with instructional audio and technical docs.",
    overviewTitle: "Design Reviews That Everyone Understands",
    overview:
      "Design reviews often stall when non-technical stakeholders can't parse a CAD render. Publishing an interactive, annotated 3D model — with embedded audio walkthroughs and technical documentation — keeps design and business teams aligned.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-600",
    imgurl: "/img/Skeletal.png",
  },
  {
    slug: "presentation",
    title: "Presentation Solution",
    eyebrow: "Sales & Presentation",
    shortDescription:
      "Elevate sales decks using modern visual styles. Combine text annotations and audio clips to captivate prospective buyers.",
    overviewTitle: "Interactive Decks That Close Deals",
    overview:
      "A flat slide deck can't compete with a product you can spin, open, and explore. VIQUBED lets sales teams embed interactive 3D centerpieces directly into presentations, paired with annotations and audio to guide the pitch.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    imgurl: "/img/Transportation.png",
  },
  {
    slug: "advertorial",
    title: "Advertorial Solution",
    eyebrow: "Advertising & Marketing",
    shortDescription:
      "Embed zero-friction, interactive 3D models directly inside native online articles to drive higher reader engagement and conversions.",
    overviewTitle: "Interactive Advertorials That Convert",
    overview:
      "Static banner ads are easy to scroll past. Embedding a zero-install, interactive 3D model directly inside a native article gives readers a reason to stop, explore, and engage — driving measurably higher conversion.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    imgurl: "/img/Compact_Prover.png",
  },
]

export function getSolutionBySlug(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug)
}
