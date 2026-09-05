export type DesignerThemeRegion = "Northeast" | "South" | "Midwest" | "West";
export type CropLayout = { headerBottom: number; rowSplit: number; footerTop: number };
export type DesignerThemeDesign = { id: string; slug: string; name: string; theme: string; image: string; price: number; colors: string[] };
export type DesignerThemeState = {
  slug: string; name: string; region: DesignerThemeRegion; tagline: string; description: string;
  source: string; hero: string; cardImage: string; headerImage: string; crop: CropLayout; designs: DesignerThemeDesign[];
};

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const colors = ["Cream", "Navy", "Sage", "Charcoal"];
const layouts = {
  standard: { headerBottom: 176 / 1024, rowSplit: 576 / 1024, footerTop: 958 / 1024 },
  tall: { headerBottom: 140 / 1122, rowSplit: 615 / 1122, footerTop: 1060 / 1122 },
  island: { headerBottom: 188 / 1152, rowSplit: 624 / 1152, footerTop: 1099 / 1152 },
  jersey: { headerBottom: 96 / 1024, rowSplit: 531 / 1024, footerTop: 974 / 1024 },
  newYork: { headerBottom: 0, rowSplit: 512 / 1024, footerTop: 1 },
};

type StateSeed = Omit<DesignerThemeState, "source" | "hero" | "cardImage" | "headerImage" | "designs"> & { layout: keyof typeof layouts; products: Array<[string, string]> };
const seeds: StateSeed[] = [
  { slug: "new-jersey", name: "New Jersey", region: "Northeast", tagline: "The Garden State", description: "Falls, shoreline, city lights and Garden State identity.", layout: "jersey", crop: layouts.jersey, products: [["Paterson Great Falls","Paterson"],["Atlantic City Nights","Atlantic City"],["Cape May Charm","Cape May"],["Newark Skyline","Newark"],["Jersey Shore","The Shore"],["Pine Barrens","Wharton State Forest"],["Liberty State Park","Jersey City"],["Delaware Water Gap","Northwest New Jersey"],["Garden State Road Trip","Across New Jersey"],["Garden State Identity","New Jersey"]] },
  { slug: "new-york", name: "New York", region: "Northeast", tagline: "City. Water. Wild.", description: "Concrete energy, iconic views, falling water and wild escapes.", layout: "newYork", crop: layouts.newYork, products: [["Concrete Jungle","New York City"],["City of Lights","Brooklyn Nights"],["Icon of Freedom","Liberty Island"],["Skyline Minimal","Lower Manhattan"],["Brooklyn Vibes","Brooklyn"],["Adirondack Escape","Adirondacks"],["Niagara Flow","Niagara Falls"],["Broadway Nights","Times Square"],["Harbor Days","New York Harbor"],["Empire State of Mind","Manhattan"]] },
  { slug: "connecticut", name: "Connecticut", region: "Northeast", tagline: "Small State. Big Heritage.", description: "Seaports, architecture, forests, falls and shoreline stories.", layout: "tall", crop: layouts.tall, products: [["Mystic Seaport","Maritime Heritage"],["Yale Architecture","New Haven"],["Beardsley Zoo","Bridgeport"],["Mark Twain House","Hartford"],["Essex Steam Train","Connecticut River Valley"],["Hammonasset Beach","Connecticut Coast"],["The Falls","Waterfall Country"],["Lake Compounce","Bristol"],["Litchfield Hills","Northwest Hills"],["Connecticut Pride","The Constitution State"]] },
  { slug: "maine", name: "Maine", region: "Northeast", tagline: "Rugged Coast. Wild Beauty.", description: "Lighthouses, mountains, pines and winter-by-the-sea designs.", layout: "tall", crop: layouts.tall, products: [["Portland Harbor","Coastal Heritage"],["Acadia Adventure","Acadia National Park"],["Bar Harbor Sunrise","Mount Desert Island"],["Katahdin Peak","Baxter State Park"],["Lobster Life","Maine Coast"],["Pine Tree Forests","Maine Woods"],["Moxie Vibes","Maine Original"],["Winter by the Sea","Downeast Coast"],["Maine Lighthouses","Atlantic Coast"],["Wilderness Calling","Western Mountains"]] },
  { slug: "new-hampshire", name: "New Hampshire", region: "Northeast", tagline: "Live Free. Explore More.", description: "Mountain roads, lakes, harbors and high-country energy.", layout: "tall", crop: layouts.tall, products: [["White Mountains","The Summits"],["Lake Winnipesaukee","Lakes Region"],["Flume Gorge","Franconia Notch"],["Mount Washington","Presidential Range"],["Kancamagus Highway","White Mountain Byway"],["Old Man of the Mountain","Franconia Legacy"],["Portsmouth Harbor","Seacoast"],["Hampton Beach","Atlantic Coast"],["Dixville Notch","Great North Woods"],["Live Free","New Hampshire Spirit"]] },
  { slug: "vermont", name: "Vermont", region: "Northeast", tagline: "Small State. Big Heart.", description: "Green Mountains, lakes, trails, seasons and covered bridges.", layout: "tall", crop: layouts.tall, products: [["Green Mountains","Vermont Highlands"],["Lake Champlain","Champlain Valley"],["Stowe Vibes","Stowe"],["Sleepy Hollow Farm","Woodstock"],["Covered Bridges","Vermont Heritage"],["Maple State","Maple Country"],["Vermont Trails","Green Mountain Trails"],["Burlington Life","Burlington"],["Winter in Vermont","Mountain Winter"],["Live Free","The Vermont Way"]] },
  { slug: "rhode-island", name: "Rhode Island", region: "Northeast", tagline: "Ocean State of Mind", description: "Lighthouses, sailing, Newport and coastal connection.", layout: "island", crop: layouts.island, products: [["Beacon of History","Point Judith"],["Sail Away","Narragansett Bay"],["Newport Charm","Newport"],["Providence Pride","State House"],["Ocean State","Rhode Island Coast"],["Cliff Walk Views","Newport Cliff Walk"],["Local Flavor","Del's Lemonade"],["Home","Rhode Island Identity"],["Coastal Escape","Island Days"],["Iconic Connection","Newport Bridge"]] },
  { slug: "massachusetts", name: "Massachusetts", region: "Northeast", tagline: "History. Harbors. Heritage.", description: "Boston, Cape Cod, Salem and New England coastline stories.", layout: "standard", crop: layouts.standard, products: [["Boston Skyline","Boston"],["Cape Cod Vibes","Cape Cod"],["Freedom Trail","Boston Heritage"],["Salem Heritage","Salem"],["Martha's Vineyard","Island Life"],["Berkshire Mountains","The Berkshires"],["Fenway Faithful","Boston Baseball"],["New England Coast","Atlantic Shore"],["Acadia Connection","New England Nature"],["Heart of New England","Massachusetts Identity"]] },
  { slug: "pennsylvania", name: "Pennsylvania", region: "Northeast", tagline: "Rooted in History. Built for Tomorrow.", description: "Steel cities, mountains, waterfalls, rail and rural stories.", layout: "standard", crop: layouts.standard, products: [["Steel City Nights","Pittsburgh"],["Liberty Bell State","Philadelphia"],["Mountains Calling","Poconos"],["Philly Vibes","Philadelphia"],["Lake Life","Presque Isle"],["Forest State of Mind","Pennsylvania Wilds"],["Waterfalls & Wilds","Ricketts Glen"],["Amish Country Roads","Lancaster County"],["Keystone State","Pennsylvania Identity"],["Road, River, Rail","Pennsylvania Travel"]] },
  { slug: "virginia", name: "Virginia", region: "South", tagline: "Old Roots. Bold Future.", description: "Coast, Blue Ridge, rivers, Richmond and local character.", layout: "standard", crop: layouts.standard, products: [["Coastal State of Mind","Virginia Beach"],["Blue Ridge Escape","Shenandoah"],["River Runs Deep","James River"],["History in Every Corner","Colonial Virginia"],["City Lights, Old Nights","Richmond"],["Mountains. Forests. Freedom.","Appalachian Trail"],["Wine. Land. Time.","Loudoun County"],["Beacon of Legacy","Cape Henry"],["State of Character","Virginia Identity"],["Rooted. Proud. Virginian.","Southern Virginia"]] },
  { slug: "north-carolina", name: "North Carolina", region: "South", tagline: "First in Flight. Forever Original.", description: "Outer Banks, Blue Ridge, rivers, cities and waterfall stories.", layout: "standard", crop: layouts.standard, products: [["First in Flight","Kitty Hawk"],["Blue Ridge State of Mind","Blue Ridge Mountains"],["River Runs Through It","French Broad River"],["RDU Roots","Raleigh-Durham"],["Ocean Air, Salty Hair","Outer Banks"],["Appalachian Path","North Carolina Trails"],["Cardinal State","North Carolina Nature"],["Waterfall State","Western North Carolina"],["Pine, Coast, Culture","Mountains to Sea"],["North Carolina","Tar Heel Identity"]] },
  { slug: "south-carolina", name: "South Carolina", region: "South", tagline: "Palmetto Soul. Coastal Heart.", description: "Lowcountry color, beach energy, lakes and Palmetto identity.", layout: "standard", crop: layouts.standard, products: [["Coastal State of Mind","South Carolina Coast"],["Palmetto Pride","Palmetto State"],["Charleston Charm","Charleston"],["Beaufort Vibes","Lowcountry"],["Beach. Breeze. Bliss.","Myrtle Beach"],["Lake Life","Lake Keowee"],["Southern Nights","Carolina Nights"],["Where the Rivers Meet","South Carolina Rivers"],["Gamecock Spirit","South Carolina Spirit"],["Palmetto & Pines","Mountains to the Sea"]] },
  { slug: "florida", name: "Florida", region: "South", tagline: "Sunshine State of Mind", description: "Miami nights, keys, tropical life and boardwalk days.", layout: "standard", crop: layouts.standard, products: [["Ocean State of Mind","Florida Coast"],["Miami Nights","Miami"],["Everglades Spirit","Everglades"],["Palm Trees & Sunsets","Gulf Coast"],["Keys to Paradise","Florida Keys"],["Tropical State","Tropical Florida"],["Florida Keys Vibes","The Keys"],["Shark State of Mind","Atlantic Waters"],["Boardwalk Days","Beach Towns"],["Swamp. Sky. Freedom.","Wild Florida"]] },
  { slug: "georgia", name: "Georgia", region: "South", tagline: "Rooted Deep. Made to Inspire.", description: "Atlanta energy, Savannah charm, falls, coast and Blue Ridge.", layout: "standard", crop: layouts.standard, products: [["City of Dreams","Atlanta"],["Take Flight","ATL"],["Peach State Vibes","Georgia Identity"],["Historic Charm","Savannah"],["Blue Ridge Calling","North Georgia"],["Chase the Falls","Amicalola Falls"],["Coastal Soul","Georgia Coast"],["Wild & Untamed","Okefenokee"],["Culture. Music. Heart.","Atlanta Streets"],["Georgia on My Mind","Georgia Identity"]] },
  { slug: "tennessee", name: "Tennessee", region: "South", tagline: "Volunteer Spirit. Music Soul. Mountain Heart.", description: "Music City energy, Smoky Mountain landscapes, rivers, waterfalls and Southern stories.", layout: "standard", crop: layouts.standard, products: [["Music City Nights","Nashville / Music Culture"],["Songwriter State","Nashville Music Culture"],["Memphis Soul","Beale Street / Blues"],["Smoky Mountain Magic","Great Smoky Mountains"],["Gatlinburg Vibes","Gatlinburg"],["Tennessee River","River Life"],["Waterfall State","Waterfalls"],["Chattanooga Strong","River & Mountain City"],["Appalachian Wilderness","Appalachian Mountains"],["Volunteer State","Tennessee Identity"]] },
  { slug: "ohio", name: "Ohio", region: "Midwest", tagline: "The Heart of It All", description: "City nights, aviation, rivers, forests, lakes and local roots.", layout: "standard", crop: layouts.standard, products: [["Midwest State of Mind","Columbus"],["Take Me Home","Cleveland"],["Rooted in Nature","Hocking Hills"],["Birthplace of Dreams","Dayton Aviation"],["River Life","Cincinnati"],["The Buckeye State","Ohio Identity"],["Farmland Soul","Ohio Country"],["Lake Days","Lake Erie"],["USA's Playground","Cedar Point"],["Wild Heart","Wayne National Forest"]] },
  { slug: "michigan", name: "Michigan", region: "Midwest", tagline: "Great Lakes. Great Times.", description: "Detroit, the Upper Peninsula, lake life, islands and freshwater adventure.", layout: "standard", crop: layouts.standard, products: [["Great Lakes State of Mind","Michigan Coast"],["Detroit Roots","Detroit"],["UP North Escape","Upper Peninsula"],["Mackinac Memories","Mackinac Island"],["Lake Life","Great Lakes"],["Wilderness Within","Michigan Wilds"],["Freshwater State","Five Great Lakes"],["Cherry Capital Vibes","Traverse City"],["Midwest Made","Michigan Identity"],["Coast to Coast","Two Peninsulas"]] },
  { slug: "nevada", name: "Nevada", region: "West", tagline: "Born for Adventure. Built for the Bold.", description: "Vegas lights, desert roads, red rock, starlight and Tahoe.", layout: "standard", crop: layouts.standard, products: [["Vegas Nights","Las Vegas"],["Fremont Vibes","Fremont Street"],["Red Rock State of Mind","Red Rock"],["Valley of Fire","Valley of Fire"],["Lake Tahoe Days","Lake Tahoe"],["Hoover Dam","Colorado River"],["Great Basin Nights","Great Basin"],["Desert Roads","Nevada Desert"],["Area 51","Nevada Mystery"],["Battle Born","Nevada Identity"]] },
  { slug: "washington", name: "Washington", region: "West", tagline: "Evergreen State. Endless Adventure.", description: "Seattle nights, Rainier, Pacific coast, islands and Cascades.", layout: "standard", crop: layouts.standard, products: [["Emerald City Nights","Seattle"],["Space Needle State","Seattle Skyline"],["Mount Rainier","Mount Rainier"],["Pacific Coast Vibes","Washington Coast"],["Leavenworth","Cascade Country"],["Hurricane Ridge","Olympic Peninsula"],["Columbia River","Columbia Gorge"],["San Juan Islands","Puget Sound"],["North Cascades","North Cascades"],["Evergreen State","Washington Identity"]] },
];

const stateCatalogWithDesigns: DesignerThemeState[] = seeds.map((state) => ({
  ...state,
  source: `/assets/elphino/source/${state.slug}.png`,
  hero: `/assets/elphino/states/${state.slug}/hero.webp`,
  cardImage: `/assets/elphino/state-templates/${state.slug}-card-v2.webp`,
  headerImage: `/assets/elphino/state-templates/${state.slug}-header-v2.webp`,
  designs: state.products.map(([name, theme], index) => {
    const number = String(index + 1).padStart(2, "0");
    const slug = slugify(name);
    return { id: `${state.slug}-${number}`, slug, name, theme, image: `/assets/elphino/states/${state.slug}/${number}-${slug}-v3.webp`, price: 14, colors };
  }),
}));

export type StateRoundNeckDesign = DesignerThemeDesign & {
  stateSlug: string;
  stateName: string;
  region: DesignerThemeRegion;
};

/** State artwork now belongs to the regular Round Necks collection. */
export const stateRoundNeckDesigns: StateRoundNeckDesign[] = stateCatalogWithDesigns.flatMap((state) =>
  state.designs.map((design) => ({
    ...design,
    stateSlug: state.slug,
    stateName: state.name,
    region: state.region,
  })),
);

/** Theme pages remain available as empty spaces for future concept releases. */
export const designerThemeStates: DesignerThemeState[] = stateCatalogWithDesigns.map((state) => ({
  ...state,
  designs: [],
}));

export function getDesignerThemeState(slug: string) { return designerThemeStates.find((state) => state.slug === slug); }
export function getDesignerThemeDesign(stateSlug: string, designSlug: string) { const state = getDesignerThemeState(stateSlug); return state ? { state, design: state.designs.find((design) => design.slug === designSlug) } : undefined; }
