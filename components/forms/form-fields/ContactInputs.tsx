// components/tiers/form-fields/ContactInputs.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useForm } from 'react-hook-form';

type ContactInputsProps = {
  register: any;
  errors?: any;
};

export function ContactInputs({ register, errors }: ContactInputsProps) {


 const {  handleSubmit,setValue,  } = useForm({
    defaultValues: {
      segment: "",
      plafondCredit: "",
      canalAquisition: "",
    }
  });


  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Coordonnées</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email principal</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="contact@entreprise.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Téléphone</Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            placeholder="+237 656 616 751"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://www.entreprise.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="canalPrefere">Canal préféré</Label>
          <Select
            id="canalPrefere"
            options={[
              { value: "email", label: "Email" },
              { value: "phone", label: "Téléphone" },
              { value: "courrier", label: "Courrier" },
              { value: "in_person", label: "En personne" },
            ]}
            {...register("canalPrefere")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="canalprefere">Canal Prefere</Label>
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
      </div>
    </div>
  );
}