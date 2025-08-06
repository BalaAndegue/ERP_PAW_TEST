// components/tiers/forms/CommercialForm.tsx

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

import { useTiersApi } from '@/hooks/useTiersApi';
import { TierBaseForm } from './TiersBaseForm';
import { MultiSelect } from '../ui/multi-select';
import { useToast } from '@/hooks/use-toast';

import { useForm } from 'react-hook-form';


export function CommercialForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const api = useTiersApi();
  const { register, } = useForm();

  const handleSubmit = async (data: any) => {
    try {
      await api.createCommercial.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du commercial",
        variant: "destructive"
      });
    }
  };

  return (
    <TierBaseForm onSubmit={handleSubmit} onSuccess={onSuccess}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="typeCommercial">Type de commercial</Label>
          <Select {...register("typeCommercial")}>
            <option value="interne">Interne</option>
            <option value="externe">Externe</option>
            <option value="independant">Indépendant</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="commission">Taux de commission (%)</Label>
          <Input
            id="commission"
            type="number"
            step="0.1"
            min="0"
            {...register("commission")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateDebutContrat">Date début contrat</Label>
          <Input
            id="dateDebutContrat"
            type="date"
            {...register("dateDebutContrat")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFinContrat">Date fin contrat</Label>
          <Input
            id="dateFinContrat"
            type="date"
            {...register("dateFinContrat")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zonesCouvertes">Zones couvertes</Label>
        <MultiSelect
          options={[
            { value: "nord", label: "Région Nord" },
            { value: "sud", label: "Région Sud" },
            { value: "est", label: "Région Est" },
            { value: "ouest", label: "Région Ouest" },
            { value: "international", label: "International" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialisations">Spécialisations</Label>
        <MultiSelect
          options={[
            { value: "b2b", label: "B2B" },
            { value: "b2c", label: "B2C" },
            { value: "secteur_public", label: "Secteur public" },
            { value: "grands_comptes", label: "Grands comptes" },
          ]}
          // If MultiSelect supports inputProps or similar, use:
          // inputProps={register("specialisations")}
          // Otherwise, remove {...register("specialisations")} to avoid prop conflicts
        />
      </div>
    </TierBaseForm>
  );
}