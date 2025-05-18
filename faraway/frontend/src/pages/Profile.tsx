import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import placeholderProfile from '../assets/placeholderProfile.png';
import Button from '../components/Button';
import useDecodedToken from '../utils/DecodeToken';
import axios from 'axios';
import ChatBot from '@/components/ChatBot';

interface ProfileData {
  gender?: string;
  age?: number;
  address?: string;
  dateOfBirth?: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<ProfileData>({});
    const [error, setError] = useState<string>('');
    const patient = useDecodedToken();

    useEffect(() => {
      const getProfile = async () => {
        try {
          if (!patient || !patient.email) {
            throw new Error('No email found');
          }
          
          const response = await axios.get('http://localhost:7000/profile', {
            params: {
              email: patient.email
            }
          });

          setProfile(response.data.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile data');
        }
      };

      if (patient) {
        getProfile();
      }
    }, [patient]);

    if (!patient) {
      return <div className="p-10">Loading profile...</div>;
    }

    if (error) {
      return <div className="p-10 text-red-500">{error}</div>;
    }

    const patientData = {
      id: "PT-20250001",
      sex: profile.gender || 'N/A',
      age: profile.age || 'N/A'
    };

    const ContactInfo = {
      phone: "09193756332",
      email: patient.email,
      address: profile.address || 'N/A',
      birth: profile.dateOfBirth
        ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
        : 'N/A'
    };

    const MedInfo = {
      doctor: "Dr. Patricia Estrella",
      blood: "O+",
      allergies: "Peanuts, Seafood",
      meds: "Atorvastatin 20mg - Once daily at bedtime | Metformin 500mg - Twice daily with meals"
    };

    return (
      <div className='flex flex-col min-h-screen'>
        <header>
          <Header user={patient} />
        </header>
        <div className='flex flex-1'>
          <Nav user={patient} />
          <div className='flex-1'>
            <div className='border-b border-[#9E9E9E] p-6'>
              <h1 className='text-5xl text-[#005F92] font-semibold'>Patient Profile</h1>
              <div className='flex justify-between m-10'>
                <div className='flex items-center gap-10'>
                  <img 
                    src={placeholderProfile} 
                    alt="placeholderProfile"
                    className='w-50 h-50 rounded-full mb-3' 
                  />
                  <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-[#404040]'>{patient.name}</h1>
                    <h3 className='text-[#525252]'>Patient ID: {patientData.id} | {patientData.sex}, {patientData.age}</h3>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Button text={'Edit Profile'} className='bg-none border border-[#005F92] px-3 py-2 rounded-xl cursor-pointer'></Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className='flex flex-col items-center justify-center p-10 gap-10'>
              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <h2 className="text-2xl text-gray-900 mb-4">
                  Contact Information
                </h2>
                <hr className="border-gray-200 mb-6" />
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Phone</div>
                    <div className="w-2/3">{ContactInfo.phone}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Email</div>
                    <div className="w-2/3">{ContactInfo.email}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Address</div>
                    <div className="w-2/3">{ContactInfo.address}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Date of Birth</div>
                    <div className="w-2/3">{ContactInfo.birth}</div>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <h2 className="text-2xl text-gray-900 mb-4">
                  Medical Information
                </h2>
                <hr className="border-gray-200 mb-6" />
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Primary Doctor</div>
                    <div className="w-2/3">{MedInfo.doctor}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Blood Type</div>
                    <div className="w-2/3">{MedInfo.blood}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Allergies</div>
                    <div className="w-2/3">{MedInfo.allergies}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-[#525252]">Medications</div>
                    <div className="w-2/3">{MedInfo.meds}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChatBot />
      </div>
    );
};

export default Profile;
