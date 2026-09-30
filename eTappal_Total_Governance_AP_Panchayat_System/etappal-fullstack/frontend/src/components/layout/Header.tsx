import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginModal } from '../auth/LoginModal';

export const Header: React.FC = () => {
  const { user, switchSeat, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', color: '#fff', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: '#f59e0b', color: '#000', fontWeight: 800, fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>AP PR&RD</span>
        <div>
          <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>e-Tappal & Tottenham Management System</h1>
          <p style={{ fontSize: '0.725rem', opacity: 0.85, margin: 0 }}>Madanapuram Gram Panchayat | Saravakota Mandal | Srikakulam District</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700 }}>
          ● Local Storage Mode (100% Offline)
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>{user.fullName}</span>
            <select value={user.activeSeat} onChange={e => switchSeat(e.target.value)} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              {user.allowedSeats.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Official Login</button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};
