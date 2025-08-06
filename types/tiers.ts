
// types/tiers.ts
export type TierType = "client" | "supplier" | "prospect" | "commercial";

export type ProspectSource = "site_web" | "reseau_social" | "salon" | "recommandation";
export type PotentialLevel = "faible" | "moyen" | "eleve" | "strategique";

// Types pour les commerciaux
export type CommercialType = "interne" | "externe" | "independant";
export type ZoneCouverture = "nord" | "sud" | "est" | "ouest" | "international";
export type Specialisation = "b2b" | "b2c" | "secteur_public" | "grands_comptes";

export interface Tier {
  id: number;
  name: string;
  type: "client" | "fournisseur" | "prospect" | "commerciaux";
  email: string;
  phone: string;
  status: 'actif' | 'inactif' | 'suspendu';
  lastContact: string;
  revenue: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  contactPerson?: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  documents?: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadDate: string;
  }[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TierFilters {
  search?: string;
  type?: string;
  status?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface TierStats {
  totalTiers: number;
  clientsCount: number;
  fournisseursCount: number;
  partenairesCount: number;
  prospectsCount: number;
  totalRevenue: number;
  monthlyGrowth: number;
}