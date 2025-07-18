import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: "Marie Dubois",
    action: "a créé un nouveau client",
    target: "Acme Corp",
    time: "Il y a 2 minutes",
    type: "create",
  },
  {
    id: 2,
    user: "Jean Martin",
    action: "a modifié la facture",
    target: "#FAC-001",
    time: "Il y a 15 minutes",
    type: "update",
  },
  {
    id: 3,
    user: "Sophie Durand",
    action: "a supprimé le fournisseur",
    target: "Tech Solutions",
    time: "Il y a 1 heure",
    type: "delete",
  },
  {
    id: 4,
    user: "Pierre Rousseau",
    action: "a validé le paiement",
    target: "€2,500",
    time: "Il y a 2 heures",
    type: "validate",
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "create":
      return "default";
    case "update":
      return "secondary";
    case "delete":
      return "destructive";
    case "validate":
      return "outline";
    default:
      return "default";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2`} />
                <AvatarFallback>
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
              <Badge variant={getBadgeVariant(activity.type)}>
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}