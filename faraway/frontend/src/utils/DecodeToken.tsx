import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types';

const useDecodedToken = (): User | null => {
  const [patient, setPatient] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setPatient(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  return patient;
};

export default useDecodedToken;