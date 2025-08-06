// components/tiers/form-fields/CompanyInfoInputs.tsx
'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CompanyInfoInputsProps = {
  register: any;
  errors?: any;
  control?: any;
};

export function CompanyInfoInputs({ register, errors, control }: CompanyInfoInputsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informations de l'entreprise</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet*</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Nom de l'entreprise"
        />
        {errors?.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="shortName">Nom court</Label>
          <Input
            id="shortName"
            {...register("shortName")}
            placeholder="Nom commercial"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longName">Nom complet légal</Label>
          <Input
            id="longName"
            {...register("longName")}
            placeholder="Raison sociale complète"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description de l'activité..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="secteurActivite">Secteur d'activité</Label>
          <Select
            id="secteurActivite"
            options={[
              { value: "it", label: "Technologie" },
              { value: "finance", label: "Finance" },
              { value: "sante", label: "Santé" },
              { value: "industrie", label: "Industrie" },
              { value: "commerce", label: "Commerce" },
            ]}
            {...register("secteurActivite")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tailleEntreprise">Taille d'entreprise</Label>
          <Select
            id="tailleEntreprise"
            options={[
              { value: "micro", label: "Micro-entreprise" },
              { value: "pme", label: "PME" },
              { value: "eti", label: "ETI" },
              { value: "ge", label: "Grande entreprise" },
            ]}
            {...register("tailleEntreprise")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateCreation">Date de création</Label>
          <Input
            id="dateCreation"
            type="date"
            {...register("dateCreation")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="registreCommmerce">Registre de commerce</Label>
          <Input
            id="registreCommmerce"
            {...register("registreCommmerce")}
            placeholder="Numéro RC"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroFiscal">Numéro fiscal</Label>
          <Input
            id="numeroFiscal"
            {...register("numeroFiscal")}
            placeholder="Numéro SIRET/TVA"
          />
        </div>
      </div>
    </div>
  );
}