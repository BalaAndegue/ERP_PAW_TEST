import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TierBaseForm } from './TiersBaseForm';
import { useToast } from '@/hooks/use-toast';
import { useTiersApi } from '@/hooks/useTiersApi';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { MultiSelect } from '@/components/ui/multi-select';

const supplierSchema = z.object({
  modePaiement: z.string().min(1, "Mode de paiement requis"),
  delaiLivraison: z.string().min(1, "Délai requis"),
  produitsPrincipaux: z.array(z.string()).optional(),
});

export function SupplierForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const api = useTiersApi();
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await api.createSupplier.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du fournisseur",
        variant: "destructive"
      });
    }
  };

  return (
    <TierBaseForm onSubmit={handleSubmit(onSubmit)} onSuccess={onSuccess}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="modePaiement">Mode de paiement</Label>
          <Select
            value={watch("modePaiement")}
            onValueChange={(value) => setValue("modePaiement", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="virement">Virement bancaire</SelectItem>
              <SelectItem value="cheque">Chèque</SelectItem>
              <SelectItem value="traite">Traite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="delaiLivraison">Délai de livraison</Label>
          <Input 
            id="delaiLivraison" 
            placeholder="Ex: 15 jours" 
            {...register("delaiLivraison")} 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Produits principaux</Label>
          <MultiSelect
            options={[
              { value: "electronique", label: "Électronique" },
              { value: "materiel", label: "Matériel" },
              { value: "logiciel", label: "Logiciel" },
            ]}
            value={watch("produitsPrincipaux") || []}
            onChange={(values) => setValue("produitsPrincipaux", values)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certification">Certification</Label>
          <Input 
            id="certification" 
            {...register("certification")} 
          />
        </div>
      </div>
    </TierBaseForm>
  );
}