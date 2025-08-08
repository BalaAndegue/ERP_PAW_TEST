// components/tiers/form-fields/CompanyInfoInputs.tsx
'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type CompanyInfoInputsProps = {
  register: any;
  errors?: any;
  control?: any;
};

export function CompanyInfoInputs({ register, errors, control }: CompanyInfoInputsProps) {

  const { watch, setValue } = useForm();
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
            onValueChange={(value) => setValue("secteurActivite", value)}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">Technologie</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="sante">Santé</SelectItem>
              <SelectItem value="industrie">Industrie</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tailleEntreprise">Taille d'entreprise</Label>
          <Select
            value={watch("tailleEntreprise")}
            onValueChange={(value) => setValue("tailleEntreprise", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une taille" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="micro">Micro-entreprise</SelectItem>
              <SelectItem value="pme">PME</SelectItem>
              <SelectItem value="eti">ETI</SelectItem>
              <SelectItem value="ge">Grande entreprise</SelectItem>
            </SelectContent>
          </Select>
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