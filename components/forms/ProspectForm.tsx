// components/tiers/forms/ProspectForm.tsx
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useToast } from '@/hooks/use-toast';
import { useTiersApi } from '@/hooks/useTiersApi';
import { TierBaseForm } from './TiersBaseForm';

export function ProspectForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const api = useTiersApi();
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await api.createProspect.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du prospect",
        variant: "destructive"
      });
    }
  };

  return (
    <TierBaseForm onSubmit={handleSubmit(onSubmit)} onSuccess={onSuccess}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sourceProspect">Source du prospect</Label>
          <Select
            value={watch("sourceProspect")}
            onValueChange={(value) => setValue("sourceProspect", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="site_web">Site web</SelectItem>
              <SelectItem value="reseau_social">Réseau social</SelectItem>
              <SelectItem value="salon">Salon professionnel</SelectItem>
              <SelectItem value="recommandation">Recommandation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="potentiel">Potentiel estimé</Label>
          <Select
            value={watch("potentiel")}
            onValueChange={(value) => setValue("potentiel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un potentiel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="faible">Faible</SelectItem>
              <SelectItem value="moyen">Moyen</SelectItem>
              <SelectItem value="eleve">Élevé</SelectItem>
              <SelectItem value="strategique">Stratégique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateConversion">Date de conversion estimée</Label>
          <Input
            id="dateConversion"
            type="date"
            {...register("dateConversion")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="probabilite">Probabilité de conversion (%)</Label>
          <Input
            id="probabilite"
            type="number"
            min="0"
            max="100"
            {...register("probabilite")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notesProspect">Notes</Label>
        <Textarea
          id="notesProspect"
          {...register("notesProspect")}
          placeholder="Informations supplémentaires sur le prospect..."
          className="min-h-[100px]"
        />
      </div>
    </TierBaseForm>
  );
}