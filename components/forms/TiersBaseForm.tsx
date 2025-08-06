import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';



import { Button } from '@/components/ui/button';
import { CompanyInfoInputs } from './form-fields/CompanyInfoInputs';
import { AddressInputs } from './form-fields/AddressInputs';
import { ContactInputs } from './form-fields/ContactInputs';

// Schéma de validation de base
const baseTierSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  shortName: z.string().optional(),
  longName: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email("Email invalide").optional(),
  phoneNumber: z.string().regex(/^\+?[0-9\s-]{6,}$/, "Numéro invalide").optional(),
  registreCommmerce: z.string().optional(),
  numeroFiscal: z.string().optional(),
  website: z.string().url("URL invalide").optional(),
  address: z.string().optional(),
  secteurActivite: z.string().optional(),
  tailleEntreprise: z.string().optional(),
  dateCreation: z.string().optional(),
});

type TierBaseFormProps = {
  onSubmit: (data: any) => Promise<void>;
  onSuccess?: () => void;
  defaultValues?: Partial<z.infer<typeof baseTierSchema>>;
  children?: React.ReactNode;
};

export function TierBaseForm({ onSubmit, onSuccess, defaultValues, children }: TierBaseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(baseTierSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <CompanyInfoInputs register={register} errors={errors} control={control} />
      <AddressInputs register={register} errors={errors} />
      <ContactInputs register={register} errors={errors} />
      
      {children}
      
      <div className="flex justify-end gap-4 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}