import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [empCode, setEmpCode] = useState('PS-10492');
  const [pin, setPin] = useState('1234');
  const [err, setErr] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(empCode, pin);
    if (ok) {
      onClose();
    } else {
      setErr('Invalid Employee Code or PIN (Use 1234)');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.5rem' }}>Sachivalayam Official Login</h3>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1.25rem' }}>Madanapuram Gram Panchayat (Saravakota Mandal)</p>

        {err && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', marginBottom: '1rem' }}>{err}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>EMPLOYEE / SEAT CODE</label>
            <select value={empCode} onChange={e => setEmpCode(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
              <option value="PS-10492">PS-10492 (Panchayat Secretary Gr-V)</option>
              <option value="DA-20814">DA-20814 (Digital Assistant Gr-VI)</option>
              <option value="EA-30412">EA-30412 (Engineering Assistant)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>SECURITY PIN / PASSWORD</label>
            <input type="password" value={pin} onChange={e => setPin(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="Enter 4-digit PIN" required />
            <small style="color:#64748b; font-size:0.7rem;">Demo PIN: 1234</small>
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.65rem', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
            Authenticate & Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
