import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TiersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tiers Externes</h1>
        <p className="text-muted-foreground">
          Gérer vos clients, fournisseurs et partenaires
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Exporter en CSV</DropdownMenuItem>
            <DropdownMenuItem>Exporter en Excel</DropdownMenuItem>
            <DropdownMenuItem>Exporter en PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Importer
        </Button>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Tiers
        </Button>
      </div>
    </div>
  );
}