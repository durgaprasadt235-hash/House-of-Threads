export type StorefrontProductDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  style: string;
  fit: string;
  badge?: "NEW" | "LIMITED";
  status?: "NEW" | "LIMITED";
  createdRank: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  designConcept?: string;
  designTechnique?: string;
  designKey?: string;
  poloDesign?: string;
  brandPlacement?: {
    front: string;
    back: string;
  };
  image: string;
  backImage?: string;
  colorImages?: Record<string, string>;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  variants: {
    size: string;
    color: string;
    isAvailable: boolean;
  }[];
};
