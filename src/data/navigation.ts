export const navLinks = [
  { label: "Product", to: "/product", megaMenu: true },
  { label: "Features", to: "/features", megaMenu: true },
  { label: "Solutions", to: "/solutions", megaMenu: true },
  { label: "Support", to: "/support", megaMenu: true },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export const ProductMenu = [
  {
    items: [
      { label: "Viqubed Studio", to: "/product/dashboard" },
      { label: "Optimizer", to: "/product/map-analytics" },
      { label: "Assets", to: "/product/layer-manager" },
      { label: "LMS", to: "/product/reports" },
    ],
  },
];

export const FeatureMenu = [
  {
    items: [
      { label: "Basic Features", to: "/features/basic-features" },
      { label: "Advanced Features", to: "/features/advanced-features" },
      { label: "Custom Features", to: "/features/custom-features" },
    ],
  },
];

export const SolutionsMenu = [
  {
    title: "Industry",
    items: [
      { label: "Automotive", to: "/solutions/automotive" },
      { label: "Aviation", to: "/solutions/aviation" },
      { label: "Medical", to: "/solutions/medical" },
      { label: "Engineering", to: "/solutions/engineering" },
      { label: "Industrial", to: "/solutions/industrial" },
      { label: "Electrical", to: "/solutions/electrical" },
    ],
  },
  {
    title: "Commercials / Productivity",
    items: [
      { label: "Product Design", to: "/solutions/product-design" },
      { label: "Presentation", to: "/solutions/presentation" },
      { label: "Advertorial", to: "/solutions/advertorial" },
    ],
  },
];

export const SupportMenu = [
  {
    items: [
      { label: "Help Center", to: "/support/help-center" },
      { label: "Forum", to: "/support/forum" },
      { label: "Release", to: "/support/release" },
      { label: "Tutorials", to: "/support/tutorials" },
      { label: "News", to: "/support/news" },
    ],
  },
];

export const megaMenus: Record<
  string,
  {
    title?: string;
    items: { label: string; to: string }[];
  }[]
> = {
  Product: ProductMenu,
  Features: FeatureMenu,
  Solutions: SolutionsMenu,
  Support: SupportMenu,
};