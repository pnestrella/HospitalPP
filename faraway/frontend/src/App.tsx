import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Landing from './pages/Landing';
import Login from './utils/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Profile from './pages/Profile';
import MedicalRecord from './pages/MedRecord';
import Prescriptions from './pages/Presc';
import Billing from './pages/Billing';
import HelpCenter from './pages/HelpCenter';
import Settings from './pages/Settings';
import { User } from './types';

const App: React.FC = () => {
  const [user] = useState<User>({ name: '', email: '' });

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/medicalrecord' element={<MedicalRecord />} />
          <Route path='/prescriptions' element={<Prescriptions />} />
          <Route path='/billing' element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path='/helpcenter' element={<HelpCenter />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/landing' element={<ProtectedRoute><Landing user={user} /></ProtectedRoute>} />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
