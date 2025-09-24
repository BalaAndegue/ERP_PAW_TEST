// components/tiers/forms/CommercialForm.tsx

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useTiersApi } from '@/hooks/useTiersApi';
import { TierBaseForm } from './TiersBaseForm';
import { MultiSelect } from '../ui/multi-select';
import { useToast } from '@/hooks/use-toast';

import { useForm } from 'react-hook-form';


export function CommercialForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const api = useTiersApi();
  const { register,watch, setValue } = useForm();

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
          <Select
            value={watch("typeCommercial")}
            onValueChange={(value) => setValue("typeCommercial", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interne">Interne</SelectItem>
              <SelectItem value="externe">Externe</SelectItem>
              <SelectItem value="independant">Independant</SelectItem>
              
            </SelectContent>
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
          <Select
            value={watch("zonesCouvertes")}
            onValueChange={(value) => setValue("zonesCouvertes", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="zones de couvertes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nord">Region Nord</SelectItem>
              <SelectItem value="sud">Region Sud</SelectItem>
              <SelectItem value="est">Region Est</SelectItem>
              <SelectItem value="ouest">Region Ouest</SelectItem>
              <SelectItem value="international">International</SelectItem>
              
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialisations">Spécialisations</Label>
          <Select
            value={watch("specialisations")}
            onValueChange={(value) => setValue("specialisations", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="votre zone de couverture" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
              <SelectItem value="setceur_public">Secteur public</SelectItem>
              <SelectItem value="grands_comptes">Grands comptes</SelectItem>
              
            </SelectContent>
          </Select>
        </div>

      
    </TierBaseForm>
  );
}