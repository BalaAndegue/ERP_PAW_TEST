'use client';

import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateTierDialog } from "@/components/dialogs/CreateTierDialog";

import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export-utils";
import { useTierStore } from "@/stores/tier-store";
import { useToast } from "@/hooks/use-toast";

export function MembersHeader() {
  const { toast } = useToast();
  const { tiers } = useTierStore();

  const handleExport = async (type: 'csv' | 'excel' | 'pdf') => {
    try {
      switch (type) {
        case 'csv':
          await exportToCSV(tiers, 'tiers');
          break;
        case 'excel':
          await exportToExcel(tiers, 'tiers');
          break;
        case 'pdf':
          await exportToPDF(tiers, 'tiers');
          break;
      }
      toast({
        title: "Export réussi",
        description: `Les données ont été exportées en ${type.toUpperCase()}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: `Une erreur est survenue lors de l'export ${type.toUpperCase()}`,
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Implémentez votre logique d'import ici
      // Exemple: await importTiers(file);
      toast({
        title: "Import réussi",
        description: "Les données ont été importées avec succès",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erreur d'import",
        description: "Une erreur est survenue lors de l'import",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tiers Internes</h1>
        <p className="text-muted-foreground">
          Gérer les membres de votre organisation ici
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
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Exporter en CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel')}>
              Exporter en Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Exporter en PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Importer
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.pdf"
              className="hidden"
              onChange={handleImport}
            />
          </label>
        </Button>
        
        <CreateTierDialog />
      </div>
    </div>
  );
}