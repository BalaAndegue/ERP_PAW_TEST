import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    title: "Total Tiers",
    value: "2,847",
    change: "+12% ce mois",
    icon: Building2,
  },
  {
    title: "CA Total",
    value: "€1,234,567",
    change: "+8% ce mois",
    icon: TrendingUp,
  },
  {
    title: "Factures",
    value: "1,234",
    change: "+23% ce mois",
    icon: CreditCard,
  },
  {
    title: "Utilisateurs",
    value: "47",
    change: "+3% ce mois",
    icon: Users,
  },
];

export function DashboardStats() {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}