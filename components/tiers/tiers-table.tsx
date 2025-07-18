import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Phone, Mail } from "lucide-react";

const tiers = [
  {
    id: 1,
    name: "Acme Corporation",
    type: "client",
    email: "contact@acme.com",
    phone: "+237 6 53 45 67 89",
    status: "actif",
    lastContact: "2024-01-15",
    revenue: "XFA125,000",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
  {
    id: 2,
    name: "Tech Solutions SARL",
    type: "fournisseur",
    email: "info@techsolutions.fr",
    phone: "+237 6 98 76 54 32",
    status: "actif",
    lastContact: "2024-01-10",
    revenue: "XFA75,000",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
  {
    id: 3,
    name: "Global Partners",
    type: "partenaire",
    email: "partnerships@global.com",
    phone: "+237 6 11 22 33 44",
    status: "inactif",
    lastContact: "2023-12-20",
    revenue: "XFA50,000",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
  {
    id: 4,
    name: "Startup Innovation",
    type: "prospect",
    email: "hello@startup.io",
    phone: "+33 1 55 66 77 88",
    status: "actif",
    lastContact: "2024-01-14",
    revenue: "XFA0",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "actif":
      return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
    case "inactif":
      return <Badge variant="secondary">Inactif</Badge>;
    case "suspendu":
      return <Badge variant="destructive">Suspendu</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "client":
      return <Badge className="bg-blue-100 text-blue-800">Client</Badge>;
    case "fournisseur":
      return <Badge className="bg-purple-100 text-purple-800">Fournisseur</Badge>;
    case "partenaire":
      return <Badge className="bg-orange-100 text-orange-800">Partenaire</Badge>;
    case "prospect":
      return <Badge className="bg-gray-100 text-gray-800">Prospect</Badge>;
    case "Commerciaux":
      return <Badge className="bg-gray-100 text-gray-800">Commerciaux</Badge>;
    case "Contact":
      return <Badge className="bg-gray-100 text-gray-800">Contact</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

export function TiersTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernier contact</TableHead>
              <TableHead>CA</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier) => (
              <TableRow key={tier.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={tier.avatar} />
                      <AvatarFallback>
                        {tier.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{tier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {tier.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(tier.type)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {tier.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {tier.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(tier.status)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(tier.lastContact).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="font-medium">{tier.revenue}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}