import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import PrescriptionTable from '@/components/PrescripTable';
import { sortOptions } from '@/utils/filterOptions';
import ChatBot from '@/components/ChatBot';

const Prescriptions = () => {
  const patient = useDecodedToken();
  const [sortOrder, setSortOrder] = useState<string>('newest');

  if (!patient) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header user={patient} />
      </header>
      <main className='flex flex-1'>
        <Nav user={patient} />
        <div className='flex-1'>
          <SearchBar 
            title="Prescriptions" 
            description="View your Health Information"
            data={[]}
          />

          <div className='flex-col py-30 px-35'>
            <div className='flex justify-end mb-10'>
              <Filter 
                value={sortOrder} 
                onChange={setSortOrder}
                options={sortOptions}
                placeholder="Sort by"
              />
            </div>

            <div>
              <PrescriptionTable sortOrder={sortOrder as 'newest' | 'oldest'} />
            </div>
          </div>
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default Prescriptions;
