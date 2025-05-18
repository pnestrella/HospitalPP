import { useState } from 'react';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import BillTable from '@/components/BillTable';
import ChatBot from '@/components/ChatBot';
import useDecodedToken from '@/utils/DecodeToken';

const BillRecord = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const patient = useDecodedToken();

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'medical', label: 'Medical' },
    { value: 'dental', label: 'Dental' },
    { value: 'vision', label: 'Vision' },
  ];

  if (!patient) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header user={patient} />
      </header>
      <div className='flex flex-1'>
        <Nav user={patient} />
        <div className='flex-1'>
          <SearchBar 
            title="Billing Statements" 
            description="View and manage your healthcare billing statements"
            data={[]}
          />

          <div className='flex-col py-30 px-35'>
            <div className='flex justify-end mb-10 gap-3'>
              <Filter
                value={sortOrder}
                onChange={setSortOrder}
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'oldest', label: 'Oldest First' },
                ]}
                placeholder="Sort by date"
              />
              <Filter
                value={typeFilter}
                onChange={setTypeFilter}
                options={typeOptions}
                placeholder="Filter by type"
              />
            </div>

            <div>
              <BillTable sortOrder={sortOrder} typeFilter={typeFilter} />
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default BillRecord;
