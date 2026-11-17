export type ThemeRegion = "All" | "Northeast" | "South" | "Midwest" | "West" | "Concepts";

export type ThemeCollection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  region: Exclude<ThemeRegion, "All">;
  category: "Places" | "Nature" | "City" | "Coast" | "Art";
  designCount: number;
  featured?: boolean;
};

export const elphinoThemeCollections: ThemeCollection[] = [
  { slug: "designer-worlds", title: "Designer Worlds", subtitle: "Beach · City · Forest · Waterfall", description: "Twenty printed and threadwork designs across four expressive worlds.", image: "/images/elphino/theme-boards/all-themes.png", region: "Concepts", category: "Art", designCount: 20, featured: true },
  { slug: "new-jersey", title: "New Jersey", subtitle: "The Garden State", description: "Falls, shoreline, city lights and Garden State identity.", image: "/images/elphino/theme-boards/new-jersey.png", region: "Northeast", category: "Places", designCount: 10, featured: true },
  { slug: "new-york", title: "New York", subtitle: "City, Water & Wild", description: "From concrete energy to Niagara flow and Adirondack escape.", image: "/images/elphino/theme-boards/new-york.png", region: "Northeast", category: "City", designCount: 10, featured: true },
  { slug: "connecticut", title: "Connecticut", subtitle: "Small State. Big Heritage.", description: "Seaports, architecture, forests, falls and shoreline stories.", image: "/images/elphino/theme-boards/connecticut.png", region: "Northeast", category: "Places", designCount: 10 },
  { slug: "maine", title: "Maine", subtitle: "Rugged Coast. Wild Beauty.", description: "Lighthouses, mountains, pines and winter-by-the-sea designs.", image: "/images/elphino/theme-boards/maine.png", region: "Northeast", category: "Nature", designCount: 10 },
  { slug: "new-hampshire", title: "New Hampshire", subtitle: "Live Free. Explore More.", description: "Mountain roads, lakes, harbors and high-country energy.", image: "/images/elphino/theme-boards/new-hampshire.png", region: "Northeast", category: "Nature", designCount: 10 },
  { slug: "vermont", title: "Vermont", subtitle: "Small State. Big Heart.", description: "Green Mountains, lakes, trails, seasons and covered bridges.", image: "/images/elphino/theme-boards/vermont.png", region: "Northeast", category: "Nature", designCount: 10 },
  { slug: "rhode-island", title: "Rhode Island", subtitle: "Ocean State of Mind", description: "Lighthouses, sailing, Newport and coastal connection.", image: "/images/elphino/theme-boards/rhode-island.png", region: "Northeast", category: "Coast", designCount: 10 },
  { slug: "massachusetts", title: "Massachusetts", subtitle: "History. Harbors. Heritage.", description: "Boston, Cape Cod, Salem and New England coastline stories.", image: "/images/elphino/theme-boards/massachusetts.png", region: "Northeast", category: "Places", designCount: 10 },
  { slug: "virginia", title: "Virginia", subtitle: "Old Roots. Bold Future.", description: "Coast, Blue Ridge, rivers, Richmond and local character.", image: "/images/elphino/theme-boards/virginia.png", region: "South", category: "Places", designCount: 10 },
  { slug: "north-carolina", title: "North Carolina", subtitle: "First in Flight. Forever Original.", description: "Outer Banks, Blue Ridge, rivers, cities and waterfall stories.", image: "/images/elphino/theme-boards/north-carolina.png", region: "South", category: "Places", designCount: 10 },
  { slug: "south-carolina", title: "South Carolina", subtitle: "Palmetto Soul. Coastal Heart.", description: "Lowcountry color, beach energy, lakes and Palmetto identity.", image: "/images/elphino/theme-boards/south-carolina.png", region: "South", category: "Coast", designCount: 10 },
  { slug: "florida", title: "Florida", subtitle: "Sunshine State of Mind", description: "Miami nights, keys, tropical life and boardwalk days.", image: "/images/elphino/theme-boards/florida.png", region: "South", category: "Coast", designCount: 10, featured: true },
  { slug: "georgia", title: "Georgia", subtitle: "Rooted Deep. Made to Inspire.", description: "Atlanta energy, Savannah charm, falls, coast and Blue Ridge.", image: "/images/elphino/theme-boards/georgia.png", region: "South", category: "Places", designCount: 10 },
  { slug: "ohio", title: "Ohio", subtitle: "The Heart of It All", description: "City nights, aviation, rivers, forests, lakes and local roots.", image: "/images/elphino/theme-boards/ohio.png", region: "Midwest", category: "Places", designCount: 10 },
  { slug: "pennsylvania", title: "Pennsylvania", subtitle: "Rooted in History. Built for Tomorrow.", description: "Steel cities, mountains, waterfalls, rail and rural stories.", image: "/images/elphino/theme-boards/pennsylvania.png", region: "Northeast", category: "Places", designCount: 10 },
  { slug: "michigan", title: "Michigan", subtitle: "Great Lakes. Great Times.", description: "Detroit, the UP, lake life, islands and freshwater adventure.", image: "/images/elphino/theme-boards/michigan.png", region: "Midwest", category: "Nature", designCount: 10 },
  { slug: "nevada", title: "Nevada", subtitle: "Born for Adventure. Built for the Bold.", description: "Vegas lights, desert roads, red rock, starlight and Tahoe.", image: "/images/elphino/theme-boards/nevada.png", region: "West", category: "Places", designCount: 10 },
  { slug: "tennessee", title: "Tennessee", subtitle: "Music Soul. Mountain Heart.", description: "Music cities, Smoky Mountain magic, falls and river stories.", image: "/images/elphino/theme-boards/tennessee.png", region: "South", category: "Places", designCount: 10 },
  { slug: "washington", title: "Washington", subtitle: "Evergreen State. Endless Adventure.", description: "Seattle nights, Rainier, Pacific coast, islands and Cascades.", image: "/images/elphino/theme-boards/washington.png", region: "West", category: "Nature", designCount: 10 },
];

export const totalThemeDesigns = elphinoThemeCollections.reduce((total, collection) => total + collection.designCount, 0);

export function getThemeCollection(slug: string) {
  return elphinoThemeCollections.find((collection) => collection.slug === slug);
}
