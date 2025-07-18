"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, FileText, Users } from "lucide-react";

const actions = [
  {
    title: "Nouveau Client",
    description: "Ajouter un nouveau client",
    icon: Building2,
    action: () => console.log("Nouveau client"),
  },
  {
    title: "Créer Facture",
    description: "Générer une nouvelle facture",
    icon: FileText,
    action: () => console.log("Créer facture"),
  },
  {
    title: "Paiement",
    description: "Enregistrer un paiement",
    icon: CreditCard,
    action: () => console.log("Paiement"),
  },
  {
    title: "Utilisateur",
    description: "Inviter un utilisateur",
    icon: Users,
    action: () => console.log("Utilisateur"),
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center gap-2"
                onClick={action.action}
              >
                <Icon className="h-4 w-4" />
                <div className="text-center">
                  <div className="text-xs font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}