import React, { useState, useEffect } from 'react';
import LOGO from '../assets/Group 3.png';
import placeholderProfile from '../assets/placeholderProfile.png';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const dateString = now.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };
  
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  return (
    <div className="flex justify-between items-center border-b border-[#C0C6CE] px-10 py-6 mx-auto flex-wrap">
      <div>
        <img src={LOGO} alt="logo" className="h-10" />
      </div>
      <div className="flex gap-25 items-center flex-wrap">
        <div className="flex flex-row gap-10">
          <h3>Day <span className="font-bold">{currentDate}</span></h3>
          <h3>Time <span className="font-bold">{currentTime}</span></h3>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
            <img
              src={placeholderProfile}
              alt={user.name}
              className="max-w-13"
            />
          </div>
          {dropdownVisible && (
            <div className="absolute mt-2 right-0 bg-[#005F92] shadow-lg p-4 rounded-md w-48 text-white z-10">
              <button
                onClick={() => navigate('/profile')}
                className='w-full text-left py-2 px-4 hover:bg-[#00446b] hover:cursor-pointer'
              >
                Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  alert("Logging out....");
                  navigate('/');
                }}
                className='w-full text-left py-2 px-4 hover:bg-[#00446b] hover:cursor-pointer'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
