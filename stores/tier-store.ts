// stores/tier-store.ts
import { create } from 'zustand';

type Tier = {
  id: string;
  name: string;
  type: 'client' | 'supplier' | 'prospect' | 'commercial';
  // autres champs...
};

type TierStore = {
  tiers: Tier[];
  addTier: (tier: Tier) => void;
  updateTier: (id: string, updates: Partial<Tier>) => void;
  deleteTier: (id: string) => void;
};

export const useTierStore = create<TierStore>((set) => ({
  tiers: [],
  addTier: (tier) => set((state) => ({ tiers: [...state.tiers, tier] })),
  updateTier: (id, updates) => set((state) => ({
    tiers: state.tiers.map(tier => 
      tier.id === id ? { ...tier, ...updates } : tier
    )
  })),
  deleteTier: (id) => set((state) => ({
    tiers: state.tiers.filter(tier => tier.id !== id)
  })),
}));