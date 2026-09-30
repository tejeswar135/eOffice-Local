import React from 'react';

export const PersonalRegisterTable: React.FC<{ inwards: any[] }> = ({ inwards }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>Tottenham Personal Register (PR) - Form 11 (8 Columns)</h2>
        <button onClick={() => window.print()} style={{ background: '#e2e8f0', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>🖨️ Print Form 11</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 1<br/>PR No</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 2<br/>Date of Receipt</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 3<br/>From Whom, No. & Date</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 4<br/>Subject</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 5<br/>Action / Interim Ref Issued</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 6<br/>Disposal Date</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 7<br/>Disposal Class</th>
            <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Col 8<br/>File Ref / Remarks</th>
          </tr>
        </thead>
        <tbody>
          {inwards.map((i, idx) => (
            <tr key={i.id || idx}>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', fontWeight: 'bold' }}>{idx + 1}</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>{i.date}</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>{i.sender_name}<br/><small style={{ color: '#64748b' }}>{i.diary_no}</small></td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>{i.subject}</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>Field verification inspection called</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}>--</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem' }}><span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>D. Dis</span></td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', fontFamily: 'monospace' }}>SKLM-SRVK-MDPM/PRRD/BLDG-0001/2026</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
