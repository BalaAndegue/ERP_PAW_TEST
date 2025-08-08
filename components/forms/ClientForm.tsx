
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  const { register, handleSubmit,setValue, formState: { errors } } = useForm({
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
          <Select 
          value='{watch("segment")}'
          onValueChange={(value) => setValue("segment", value)}
          {...register("segment")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="particulier">Particulier</SelectItem>
              <SelectItem value="entreprise">Entreprise</SelectItem>
              <SelectItem value="revendeur">Revendeur</SelectItem>
            </SelectContent>
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
          <Select 
          value='{watch("canalAquisition")}'
          onValueChange={(value) => setValue("canalAquisition", value)}
          {...register("canalAquisition")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="reseau">Réseau social</SelectItem>
              <SelectItem value="recommandation">Recommandation</SelectItem>
            </SelectContent>
          </Select>
          {errors.canalAquisition && <span className="text-sm text-red-500">{errors.canalAquisition.message}</span>}
        </div>
      </div>
    </TierBaseForm>
  );
}
