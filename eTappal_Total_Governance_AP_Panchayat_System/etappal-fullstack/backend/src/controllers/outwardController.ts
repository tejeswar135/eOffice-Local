import { Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/auth';

export class OutwardController {
  static issue(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { addressee, subject, dispatchMode, deptCode, subjectCode, consignmentNo } = req.body;
    const year = new Date().getFullYear();
    const seq = db.getNextSequence(user.unitId, year, deptCode || 'PRRD', subjectCode || 'GEN', 'OUTWARD');
    const outwardNumber = `SKLM-SRVK-MDPM/${deptCode || 'PRRD'}/${subjectCode || 'GEN'}-OUT-${String(seq).padStart(4, '0')}/${year}`;

    const stampRates: Record<string, number> = {
      ORDINARY_POST: 5.0,
      SPEED_POST: 41.0,
      REGISTERED_POST: 26.0,
      LOCAL_MESSENGER: 0.0,
      DIGITAL_WHATSAPP: 0.0,
    };
    const stampValue = stampRates[dispatchMode] ?? 0.0;

    const record = {
      outwardId: 'out-' + Date.now(),
      outwardNumber,
      dispatchDate: new Date().toISOString(),
      addressee,
      subject,
      dispatchMode,
      stampValue,
      consignmentNo: consignmentNo || 'N/A',
      issuedBySeat: user.activeSeat,
    };

    db.outwards.unshift(record);
    return res.status(201).json({ message: 'Outward Issued', record });
  }

  static getAll(req: AuthenticatedRequest, res: Response) {
    return res.json({ outwards: db.outwards });
  }
}
