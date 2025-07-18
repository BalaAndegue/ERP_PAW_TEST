import { TiersHeader } from '@/components/tiers/tiers-header';
import { TiersTable } from '@/components/tiers/tiers-table';
import { TiersFilters } from '@/components/tiers/tiers-filters';

export default function TiersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <TiersHeader />
      <div className="space-y-4">
        <TiersFilters />
        <TiersTable />
      </div>
    </div>
  );
}