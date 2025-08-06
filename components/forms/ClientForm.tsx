
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { TierBaseForm } from './TiersBaseForm';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useTiersApi } from '@/hooks/useTiersApi';

const clientSchema = z.object({
  segment: z.string().min(1, "Segment requis"),
  plafondCredit: z.string().optional(),
  canalAquisition: z.string().optional(),
});

import { useForm } from "react-hook-form";

export function ClientForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const api = useTiersApi();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      segment: "",
      plafondCredit: "",
      canalAquisition: "",
    }
  });

  const onFormSubmit = async (data: any) => {
    try {
      await api.createClient.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du client",
        variant: "destructive"
      });
    }
  };

  return (
    <TierBaseForm onSubmit={handleSubmit(onFormSubmit)} onSuccess={onSuccess}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="segment">Segment client</Label>
          <Select {...register("segment")}>
            <option value="">Sélectionner un segment</option>
            <option value="particulier">Particulier</option>
            <option value="entreprise">Entreprise</option>
            <option value="revendeur">Revendeur</option>
          </Select>
          {errors.segment && <span className="text-sm text-red-500">{errors.segment.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="plafondCredit">Plafond de crédit</Label>
          <Input 
            id="plafondCredit" 
            type="number" 
            {...register("plafondCredit")} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="canalAquisition">Canal d'acquisition</Label>
          <Select {...register("canalAquisition")}>
            <option value="">Sélectionner un canal</option>
            <option value="web">Site web</option>
            <option value="reseau">Réseau social</option>
            <option value="recommandation">Recommandation</option>
          </Select>
        </div>
      </div>
    </TierBaseForm>
  );
}