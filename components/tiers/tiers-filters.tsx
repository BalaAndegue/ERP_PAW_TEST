import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

export function TiersFilters() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher par nom, email..." className="pl-10" />
        </div>
        
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Type de tiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="fournisseur">Fournisseur</SelectItem>
            <SelectItem value="partenaire">Partenaire</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="actif">Actif</SelectItem>
            <SelectItem value="inactif">Inactif</SelectItem>
            <SelectItem value="suspendu">Suspendu</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Plus de filtres
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filtres actifs:</span>
        <Badge variant="secondary">
          Type: Client
          <X className="ml-1 h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary">
          Statut: Actif
          <X className="ml-1 h-3 w-3 cursor-pointer" />
        </Badge>
        <Button variant="ghost" size="sm">
          Effacer tous
        </Button>
      </div>
    </div>
  );
}