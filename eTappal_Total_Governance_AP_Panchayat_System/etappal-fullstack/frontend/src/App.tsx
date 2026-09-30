import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { PersonalRegisterTable } from './components/pr/PersonalRegisterTable';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inward' | 'pr' | 'files' | 'outward' | 'spandana'>('pr');
  const [inwards, setInwards] = useState([
    {
      id: '1',
      diary_no: '0001/2026/MDPM-INW',
      date: '18/09/2026',
      sender_name: 'Sri P. Appala Naidu',
      subject: 'Building permission application in Gramakantam Sy No 18',
      seat: 'PS-01',
      status: 'PR_ACCEPTED'
    },
    {
      id: '2',
      diary_no: '0002/2026/MDPM-INW',
      date: '18/09/2026',
      sender_name: 'Smt K. Ramanamma',
      subject: 'Drinking water pipeline repair in SC Colony (Spandana #88219)',
      seat: 'EA-01',
      status: 'PR_ACCEPTED'
    }
  ]);

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
        <Header />
        
        {/* Navigation Tabs */}
        <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '0.5rem', padding: '0.5rem 1.5rem' }}>
          <button onClick={() => setActiveTab('pr')} style={{ padding: '0.5rem 1rem', border: 'none', background: activeTab === 'pr' ? '#eff6ff' : 'transparent', color: activeTab === 'pr' ? '#1e3a8a' : '#64748b', fontWeight: 700, borderRadius: '6px', cursor: 'pointer' }}>
            📜 Tottenham Personal Register (PR)
          </button>
          <button onClick={() => setActiveTab('inward')} style={{ padding: '0.5rem 1rem', border: 'none', background: activeTab === 'inward' ? '#eff6ff' : 'transparent', color: activeTab === 'inward' ? '#1e3a8a' : '#64748b', fontWeight: 700, borderRadius: '6px', cursor: 'pointer' }}>
            📥 Inward DAK Register
          </button>
        </div>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {activeTab === 'pr' && <PersonalRegisterTable inwards={inwards} />}
          {activeTab === 'inward' && (
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#1e3a8a' }}>Inward DAK Registration Module</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Diarize incoming letters and automatically allocate Tottenham sequence numbers.</p>
            </div>
          )}
        </main>
      </div>
    </AuthProvider>
  );
};
