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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar, User, Briefcase, CreditCard, FileText, DollarSign, Receipt, History } from "lucide-react";
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
  // Nouveaux champs pour les informations comptables
  balance: number;
  authorizedPaymentMethods: string[];
  accountingInfo: {
    accountNumber: string;
    paymentCondition: string;
    bank: string;
    rib: string;
    currency: string;
  };
};

type Invoice = {
  id: number;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  tierId: number;
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
    balance: 45000,
    authorizedPaymentMethods: ["Virement", "Chèque", "Espèces"],
    accountingInfo: {
      accountNumber: "ACME-001",
      paymentCondition: "Net 30",
      bank: "BICEC",
      rib: "12345-67890-12345678901-99",
      currency: "XAF"
    }
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
    balance: -12500,
    authorizedPaymentMethods: ["Virement", "Chèque"],
    accountingInfo: {
      accountNumber: "TECH-002",
      paymentCondition: "Net 15",
      bank: "SGBC",
      rib: "54321-09876-98765432109-11",
      currency: "XAF"
    }
  },
  {
    id: 3,
    name: "DATAAFRIQUEHUB Corporation",
    type: "commercial",
    email: "contacts@acme.com",
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
    balance: 32000,
    authorizedPaymentMethods: ["Virement", "Carte Bancaire"],
    accountingInfo: {
      accountNumber: "DATA-003",
      paymentCondition: "Net 30",
      bank: "UBA",
      rib: "98765-43210-12345678901-22",
      currency: "XAF"
    }
  },
  {
    id: 4,
    name: "INTech SARL",
    type: "prospect",
    email: "infos@techsolutions.fr",
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
    balance: 0,
    authorizedPaymentMethods: ["Virement"],
    accountingInfo: {
      accountNumber: "INT-004",
      paymentCondition: "À convenir",
      bank: "Afriland First Bank",
      rib: "11223-34455-66778899001-33",
      currency: "XAF"
    }
  },
];

const sampleInvoices: Invoice[] = [
  { id: 1, number: "FACT-2024-001", date: "2024-01-05", dueDate: "2024-02-05", amount: 25000, status: "paid", tierId: 1 },
  { id: 2, number: "FACT-2024-002", date: "2024-01-15", dueDate: "2024-02-15", amount: 20000, status: "pending", tierId: 1 },
  { id: 3, number: "FACT-2024-003", date: "2024-01-20", dueDate: "2024-02-20", amount: 15000, status: "overdue", tierId: 2 },
  { id: 4, number: "FACT-2024-004", date: "2024-01-25", dueDate: "2024-02-25", amount: 30000, status: "pending", tierId: 3 },
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

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Payée</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "overdue":
        return <Badge variant="destructive">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(amount);
  };

  const getTierInvoices = (tierId: number) => {
    return sampleInvoices.filter(invoice => invoice.tierId === tierId);
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
                <TableHead>Solde</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernier contact</TableHead>
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
                          ID: {tier.taxNumber}
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
                  <TableCell className={tier.balance >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {formatCurrency(tier.balance)}
                  </TableCell>
                  <TableCell>{getStatusBadge(tier.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(tier.lastContact).toLocaleDateString('fr-FR')}
                  </TableCell>
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
                          Désactiver
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails du tiers</DialogTitle>
            <DialogDescription>
              Informations complètes sur {selectedTier?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTier && (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="accounting">Comptabilité</TabsTrigger>
                <TabsTrigger value="balance">Situation</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="invoices">Factures</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
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
              </TabsContent>
              
              <TabsContent value="accounting">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informations comptables</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4" /> Compte bancaire
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Numéro de compte</div>
                            <div>{selectedTier.accountingInfo.accountNumber}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Banque</div>
                            <div>{selectedTier.accountingInfo.bank}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">RIB</div>
                            <div>{selectedTier.accountingInfo.rib}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Devise</div>
                            <div>{selectedTier.accountingInfo.currency}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <CreditCard className="h-4 w-4" /> Conditions de paiement
                        </h4>
                        <div className="text-sm">
                          {selectedTier.accountingInfo.paymentCondition}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Receipt className="h-4 w-4" /> Modes de règlement autorisés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTier.authorizedPaymentMethods.map((method, index) => (
                            <Badge key={index} variant="outline">{method}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="balance">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Situation du solde</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Solde actuel</div>
                        <div className={`text-2xl font-bold ${selectedTier.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(selectedTier.balance)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Factures impayées</div>
                        <div className="text-2xl font-bold">
                          {getTierInvoices(selectedTier.id).filter(i => i.status !== 'paid').length}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Montant dû</div>
                        <div className="text-2xl font-bold text-amber-600">
                          {formatCurrency(
                            getTierInvoices(selectedTier.id)
                              .filter(i => i.status !== 'paid')
                              .reduce((sum, invoice) => sum + invoice.amount, 0)
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Détail des créances</h4>
                    <div className="text-sm">
                      {selectedTier.balance >= 0 
                        ? `Ce tiers vous doit ${formatCurrency(selectedTier.balance)}.`
                        : `Vous devez ${formatCurrency(-selectedTier.balance)} à ce tiers.`
                      }
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payments">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Historique des paiements</h3>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Référence</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Mode</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            Aucun paiement enregistré pour le moment.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <History className="mr-2 h-4 w-4" />
                      Voir tous les paiements
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="invoices">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Factures</h3>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Numéro</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Échéance</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getTierInvoices(selectedTier.id).length > 0 ? (
                          getTierInvoices(selectedTier.id).map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.number}</TableCell>
                              <TableCell>{new Date(invoice.date).toLocaleDateString('fr-FR')}</TableCell>
                              <TableCell>{new Date(invoice.dueDate).toLocaleDateString('fr-FR')}</TableCell>
                              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                              <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              Aucune facture trouvée.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Voir toutes les factures
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="accounting">Comptabilité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
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
              </TabsContent>
              
              <TabsContent value="accounting">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Numéro de compte</Label>
                      <Input 
                        id="accountNumber" 
                        defaultValue={selectedTier.accountingInfo.accountNumber} 
                        onChange={(e) => setSelectedTier({
                          ...selectedTier, 
                          accountingInfo: {
                            ...selectedTier.accountingInfo,
                            accountNumber: e.target.value
                          }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bank">Banque</Label>
                      <Input 
                        id="bank" 
                        defaultValue={selectedTier.accountingInfo.bank} 
                        onChange={(e) => setSelectedTier({
                          ...selectedTier, 
                          accountingInfo: {
                            ...selectedTier.accountingInfo,
                            bank: e.target.value
                          }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rib">RIB</Label>
                      <Input 
                        id="rib" 
                        defaultValue={selectedTier.accountingInfo.rib} 
                        onChange={(e) => setSelectedTier({
                          ...selectedTier, 
                          accountingInfo: {
                            ...selectedTier.accountingInfo,
                            rib: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentCondition">Conditions de paiement</Label>
                      <Input 
                        id="paymentCondition" 
                        defaultValue={selectedTier.accountingInfo.paymentCondition} 
                        onChange={(e) => setSelectedTier({
                          ...selectedTier, 
                          accountingInfo: {
                            ...selectedTier.accountingInfo,
                            paymentCondition: e.target.value
                          }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Modes de paiement autorisés</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedTier.authorizedPaymentMethods.map((method, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="balance">Solde</Label>
                      <Input 
                        id="balance" 
                        type="number"
                        value={selectedTier.balance} 
                        onChange={(e) => setSelectedTier({
                          ...selectedTier, 
                          balance: Number(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
            <DialogTitle>Confirmer la désactivation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir désactiver {selectedTier?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              desactiver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}