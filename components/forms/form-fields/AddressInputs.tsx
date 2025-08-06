// components/tiers/form-fields/AddressInputs.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type AddressInputsProps = {
  register: any;
  errors?: any;
  control?: any;
};

export function AddressInputs({ register, errors, control }: AddressInputsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informations d'adresse</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="123 Rue Principale"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complément d'adresse</Label>
          <Input
            id="complement"
            {...register("complement")}
            placeholder="Bâtiment, Appartement, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="75000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Paris"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Pays</Label>
          <Select
            id="country"
            options={[
              { value: "fr", label: "France" },
              { value: "be", label: "Belgique" },
              { value: "ch", label: "Suisse" },
              { value: "lu", label: "Luxembourg" },
            ]}
            {...register("country")}
            defaultValue="fr"
          />
        </div>
      </div>
    </div>
  );
}