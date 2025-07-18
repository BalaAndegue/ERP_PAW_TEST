import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre système ERP
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Ajouter
      </Button>
    </div>
  );
}