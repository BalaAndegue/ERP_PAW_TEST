// hooks/useTiersApi.ts
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export function useTiersApi() {
  const createClient = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/tiers/clients', data);
      return response.data;
    }
  });

  const createSupplier = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/tiers/suppliers', data);
      return response.data;
    }
  });

  const createProspect = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/tiers/prospects', data);
      return response.data;
    }
  });

  const createCommercial = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/tiers/commercials', data);
      return response.data;
    }
  });

  return {
    createClient,
    createSupplier,
    createProspect,
    createCommercial,
  };
}