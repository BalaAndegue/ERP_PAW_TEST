import { Tier, TierFilters, TierStats } from '@/types/tiers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class TiersAPI {
  static async getAllTiers(filters?: TierFilters): Promise<Tier[]> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    
    const response = await fetch(`${API_BASE_URL}/tiers?${params}`);
    if (!response.ok) throw new Error('Failed to fetch tiers');
    
    return response.json();
  }

  static async getTierById(id: number): Promise<Tier> {
    const response = await fetch(`${API_BASE_URL}/tiers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch tier');
    
    return response.json();
  }

  static async createTier(tier: Omit<Tier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tier> {
    const response = await fetch(`${API_BASE_URL}/tiers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tier),
    });
    
    if (!response.ok) throw new Error('Failed to create tier');
    
    return response.json();
  }

  static async updateTier(id: number, tier: Partial<Tier>): Promise<Tier> {
    const response = await fetch(`${API_BASE_URL}/tiers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tier),
    });
    
    if (!response.ok) throw new Error('Failed to update tier');
    
    return response.json();
  }

  static async deleteTier(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tiers/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete tier');
  }

  static async getTierStats(): Promise<TierStats> {
    const response = await fetch(`${API_BASE_URL}/tiers/stats`);
    if (!response.ok) throw new Error('Failed to fetch tier stats');
    
    return response.json();
  }

  static async exportTiers(format: 'csv' | 'excel' | 'pdf'): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/tiers/export?format=${format}`);
    if (!response.ok) throw new Error('Failed to export tiers');
    
    return response.blob();
  }

  static async importTiers(file: File): Promise<{ success: number; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tiers/import`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to import tiers');
    
    return response.json();
  }
}