"use client";

import { useState } from 'react';
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
import { MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar, User, Briefcase, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Tier = {
  id: number;
  name: string;
  type: "client" | "fournisseur" | "partenaire" | "prospect" | "commercial";
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  status: "actif" | "inactif" | "suspendu";
  lastContact: string;
  revenue: string;
  notes: string;
  paymentTerms: string;
  contactPerson: string;
  taxNumber: string;
  registrationNumber: string;
  industry: string;
  avatar: string;
};

const initialTiers: Tier[] = [
  {
    id: 1,
    name: "Acme Corporation",
    type: "client",
    email: "contact@acme.com",
    phone: "+237 6 53 45 67 89",
    address: "123 Rue des Entrepreneurs",
    city: "Douala",
    country: "Cameroun",
    postalCode: "00237",
    status: "actif",
    lastContact: "2024-01-15",
    revenue: "XFA 125,000",
    notes: "Client important depuis 2018. Paiements toujours à temps.",
    paymentTerms: "30 jours",
    contactPerson: "Jean Dupont",
    taxNumber: "TAX123456",
    registrationNumber: "RC789012",
    industry: "Fabrication",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
  {
    id: 2,
    name: "Tech Solutions SARL",
    type: "fournisseur",
    email: "info@techsolutions.fr",
    phone: "+237 6 98 76 54 32",
    address: "456 Avenue des Technologies",
    city: "Yaoundé",
    country: "Cameroun",
    postalCode: "00237",
    status: "actif",
    lastContact: "2024-01-10",
    revenue: "XFA 75,000",
    notes: "Fournisseur principal pour les équipements informatiques.",
    paymentTerms: "15 jours",
    contactPerson: "Marie Ngo",
    taxNumber: "TAX654321",
    registrationNumber: "RC345678",
    industry: "Technologie",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
  },
  // Ajoutez d'autres tiers avec les mêmes attributs...
];

export function TiersTable() {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleView = (tier: Tier) => {
    setSelectedTier(tier);
    setIsViewOpen(true);
  };

  const handleEdit = (tier: Tier) => {
    setSelectedTier(tier);
    setIsEditOpen(true);
  };

  const handleDelete = (tier: Tier) => {
    setSelectedTier(tier);
    setIsDeleteOpen(true);
  };

  const handleSave = (updatedTier: Tier) => {
    setTiers(tiers.map(t => t.id === updatedTier.id ? updatedTier : t));
    setIsEditOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedTier) {
      setTiers(tiers.filter(t => t.id !== selectedTier.id));
      setIsDeleteOpen(false);
    }
  };

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
      case "commercial":
        return <Badge className="bg-yellow-100 text-yellow-800">Commercial</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <>
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
                        <DropdownMenuItem onClick={() => handleView(tier)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(tier)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDelete(tier)}
                        >
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

      {/* Modal de visualisation */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du tiers</DialogTitle>
            <DialogDescription>
              Informations complètes sur {selectedTier?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedTier.avatar} />
                    <AvatarFallback>
                      {selectedTier.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTier.name}</h3>
                    <div className="flex gap-2">
                      {getTypeBadge(selectedTier.type)}
                      {getStatusBadge(selectedTier.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> Contact
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 opacity-50" />
                      {selectedTier.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 opacity-50" />
                      {selectedTier.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 opacity-50" />
                      {selectedTier.contactPerson}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Adresse
                  </h4>
                  <div className="text-sm">
                    <div>{selectedTier.address}</div>
                    <div>{selectedTier.postalCode} {selectedTier.city}</div>
                    <div>{selectedTier.country}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Information entreprise
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Secteur</div>
                      <div>{selectedTier.industry}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">N° Fiscal</div>
                      <div>{selectedTier.taxNumber}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">N° RC</div>
                      <div>{selectedTier.registrationNumber}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CA</div>
                      <div>{selectedTier.revenue}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Conditions de paiement
                  </h4>
                  <div className="text-sm">{selectedTier.paymentTerms}</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Dernier contact
                  </h4>
                  <div className="text-sm">
                    {new Date(selectedTier.lastContact).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    Notes
                  </h4>
                  <div className="text-sm p-3 bg-muted/50 rounded-md">
                    {selectedTier.notes}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le tiers</DialogTitle>
            <DialogDescription>
              Modifiez les informations de {selectedTier?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input 
                    id="name" 
                    defaultValue={selectedTier.name} 
                    onChange={(e) => setSelectedTier({...selectedTier, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    defaultValue={selectedTier.type}
                    onValueChange={(value) => setSelectedTier({...selectedTier, type: value as Tier['type']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="fournisseur">Fournisseur</SelectItem>
                      <SelectItem value="partenaire">Partenaire</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    defaultValue={selectedTier.status}
                    onValueChange={(value) => setSelectedTier({...selectedTier, status: value as Tier['status']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="suspendu">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    defaultValue={selectedTier.email} 
                    onChange={(e) => setSelectedTier({...selectedTier, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    defaultValue={selectedTier.phone} 
                    onChange={(e) => setSelectedTier({...selectedTier, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    defaultValue={selectedTier.address} 
                    onChange={(e) => setSelectedTier({...selectedTier, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input 
                      id="postalCode" 
                      defaultValue={selectedTier.postalCode} 
                      onChange={(e) => setSelectedTier({...selectedTier, postalCode: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input 
                      id="city" 
                      defaultValue={selectedTier.city} 
                      onChange={(e) => setSelectedTier({...selectedTier, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input 
                      id="country" 
                      defaultValue={selectedTier.country} 
                      onChange={(e) => setSelectedTier({...selectedTier, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Personne de contact</Label>
                  <Input 
                    id="contactPerson" 
                    defaultValue={selectedTier.contactPerson} 
                    onChange={(e) => setSelectedTier({...selectedTier, contactPerson: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    defaultValue={selectedTier.notes}
                    onChange={(e) => setSelectedTier({...selectedTier, notes: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => selectedTier && handleSave(selectedTier)}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de suppression */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer {selectedTier?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}