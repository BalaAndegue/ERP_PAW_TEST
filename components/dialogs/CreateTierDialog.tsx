'use client'; 
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


import { TierType } from '@/types/tiers';

import { ClientForm } from '../forms/ClientForm';
import { SupplierForm } from '../forms/SupplierForm';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProspectForm } from '../forms/ProspectForm';
import { CommercialForm } from '../forms/CommercialForm';

export function CreateTierDialog() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TierType>('client');
  const { toast } = useToast();

  const handleSuccess = () => {
    setOpen(false);
    toast({
      title: "Succès",
      description: "Le tiers a été créé avec succès",
      variant: "default"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button 
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nouveau Tiers
      </button>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Créer un nouveau tiers</DialogTitle>
        </DialogHeader>

        <Tabs value={type} onValueChange={(v) => setType(v as TierType)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="supplier">Fournisseur</TabsTrigger>
            <TabsTrigger value="prospect">Prospect</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <ClientForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="supplier">
            <SupplierForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="prospect">
            <ProspectForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="commercial">
            <CommercialForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent> 
    </Dialog>
  );
}