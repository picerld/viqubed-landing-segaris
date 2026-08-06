export interface Plan {
  id: string
  name: string
  tagline: string
  price: string
  priceSuffix?: string
  priceNote: string
  cta: string
  popular?: boolean
  enterprise?: boolean
  features: string[]
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "FREE",
    tagline:
      "Single User. Using basic settings and configurations, and start building your first 3D content project.",
    price: "IDR 0",
    priceNote: "0-day trial • No credit card required",
    cta: "Get Started for free",
    features: [
      "5 Projects included",
      "Basic Editor & Viewer",
      "Import 3D and edit",
      "Basic Optimizer",
      "Basic Assets",
    ],
  },
  {
    id: "basic",
    name: "BASIC",
    tagline:
      "Single User. More advanced features for crafting eloquent interactive content.",
    price: "IDR 150.000",
    priceSuffix: "/Monthly",
    priceNote: "",
    cta: "Get Started",
    features: [
      "10 Projects included",
      "Advanced Editor & Viewer",
      "Import 3D and edit",
      "Advanced Optimizer",
      "15 Assets library",
    ],
  },
  {
    id: "advanced",
    name: "ADVANCED",
    tagline:
      "Single User. Expanded capabilities for augmented reality and content monetization.",
    price: "IDR 250.000",
    priceSuffix: "/Monthly",
    priceNote: "",
    cta: "Get Started",
    popular: true,
    features: [
      "15 Projects included",
      "Basic Editor Features",
      "Import 3D and edit",
      "Basic Optimizer & Assets",
      "Augmented Reality (AR)",
      "Share Content",
      "Monetize Content",
    ],
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    tagline:
      "Business User. For industry users using VIQUBED platform across teams.",
    price: "Custom Contact",
    priceNote: "",
    cta: "Request free trial",
    enterprise: true,
    features: [
      "Unlimited Projects",
      "Advanced Editor & Viewer",
      "Advanced Features",
      "Unlimited Optimizer & Assets",
      "Augmented Reality (AR)",
      "AI features",
      "Share Content & Platform",
    ],
  },
]

export type CompareValue = string | boolean | "—"

export interface CompareRow {
  label: string
  values: [CompareValue, CompareValue, CompareValue, CompareValue]
}

export interface CompareGroup {
  title: string
  rows: CompareRow[]
}

export const compareGroups: CompareGroup[] = [
  {
    title: "Capacity & Limits",
    rows: [
      {
        label: "Project Allowance",
        values: ["5 Projects", "10 Projects", "15 Projects", "Unlimited"],
      },
      {
        label: "Target User Type",
        values: [
          "Single User",
          "Single User",
          "Single User",
          "Business / Teams",
        ],
      },
    ],
  },
  {
    title: "Editor & Composer Capabilities",
    rows: [
      {
        label: "Editor & Viewer Access",
        values: ["Basic Editor", "Advanced Editor", "Basic Editor", "Advanced Editor"],
      },
      { label: "Import 3D Models & Edit", values: [true, true, true, true] },
      {
        label: "3D Mesh Optimizer",
        values: ["Basic", "Advanced", "Basic", "Unlimited"],
      },
      {
        label: "Asset Libraries",
        values: ["Basic Assets", "15 Assets", "Basic Assets", "Unlimited Assets"],
      },
    ],
  },
  {
    title: "Advanced Tech & Smart Features",
    rows: [
      { label: "Augmented Reality (AR)", values: ["—", "—", true, true] },
      { label: "AI Assistant Features", values: ["—", "—", "—", true] },
    ],
  },
  {
    title: "Sharing, Platform & Monetization",
    rows: [
      { label: "Single-Link & Embed Sharing", values: ["—", "—", true, true] },
      { label: "Content Monetization", values: ["—", "—", true, "—"] },
      { label: "Custom Platform Integration", values: ["—", "—", "—", true] },
    ],
  },
]

export const compareColumns = ["FREE", "BASIC", "ADVANCED", "ENTERPRISE"]
