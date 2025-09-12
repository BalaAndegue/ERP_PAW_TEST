import { TiersHeader } from '@/components/tiers/tiers-header';
import { TiersTable } from '@/components/tiers/tiers-table';
import { TiersFilters } from '@/components/tiers/tiers-filters';
import { MembersHeader } from '@/components/members/members-header';
import { MembersTable } from '@/components/tiers/members-table';

export default function TiersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <MembersHeader />
      <div className="space-y-4">
        <TiersFilters />
        <MembersTable />
      </div>
    </div>
  );
}