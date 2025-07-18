import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TiersAPI } from '@/lib/api/tiers';
import { Tier, TierFilters } from '@/types/tiers';
import { toast } from '@/hooks/use-toast';

export function useTiers(filters?: TierFilters) {
  return useQuery(['tiers', filters], () => TiersAPI.getAllTiers(filters), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTier(id: number) {
  return useQuery(['tier', id], () => TiersAPI.getTierById(id), {
    enabled: !!id,
  });
}

export function useCreateTier() {
  const queryClient = useQueryClient();

  return useMutation(TiersAPI.createTier, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tiers']);
      toast({
        title: 'Succès',
        description: 'Le tiers a été créé avec succès.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateTier() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: number; data: Partial<Tier> }) =>
      TiersAPI.updateTier(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tiers']);
        toast({
          title: 'Succès',
          description: 'Le tiers a été modifié avec succès.',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      },
    }
  );
}

export function useDeleteTier() {
  const queryClient = useQueryClient();

  return useMutation(TiersAPI.deleteTier, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tiers']);
      toast({
        title: 'Succès',
        description: 'Le tiers a été supprimé avec succès.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useTierStats() {
  return useQuery(['tier-stats'], TiersAPI.getTierStats, {
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}