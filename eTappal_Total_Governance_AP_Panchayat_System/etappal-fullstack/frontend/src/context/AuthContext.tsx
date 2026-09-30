import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (employeeCode: string, pin: string) => Promise<boolean>;
  logout: () => void;
  switchSeat: (targetSeat: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('etappal_user');
    return saved ? JSON.parse(saved) : {
      userId: 'usr-ps-01',
      employeeCode: 'PS-10492',
      fullName: 'Sri P. Tejeswara Rao',
      designation: 'Panchayat Secretary (Grade-V)',
      activeSeat: 'PS-01',
      allowedSeats: ['PS-01', 'DA-01'],
      unitId: 'AP-SKLM-SRVK-MDPM'
    };
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('etappal_token') || 'demo-offline-jwt-token');

  const login = async (employeeCode: string, pin: string): Promise<boolean> => {
    // Offline authentication fallback
    if (pin === '1234' || pin === 'password123') {
      const authUser: AuthUser = {
        userId: 'usr-' + employeeCode.toLowerCase(),
        employeeCode: employeeCode,
        fullName: employeeCode === 'PS-10492' ? 'Sri P. Tejeswara Rao' : 'Office Assistant',
        designation: employeeCode === 'PS-10492' ? 'Panchayat Secretary (Grade-V)' : 'Digital Assistant (Grade-VI)',
        activeSeat: employeeCode === 'PS-10492' ? 'PS-01' : 'DA-01',
        allowedSeats: ['PS-01', 'DA-01'],
        unitId: 'AP-SKLM-SRVK-MDPM'
      };
      setUser(authUser);
      localStorage.setItem('etappal_user', JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('etappal_user');
    localStorage.removeItem('etappal_token');
  };

  const switchSeat = (targetSeat: string) => {
    if (user && user.allowedSeats.includes(targetSeat)) {
      const updated = { ...user, activeSeat: targetSeat };
      setUser(updated);
      localStorage.setItem('etappal_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchSeat }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
