import { Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/auth';

export class InwardController {
  static create(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { deliveryMode, senderType, senderName, senderMobile, extRef, deptCode, subjectCode, subject, targetSeat } = req.body;

    const year = new Date().getFullYear();
    const seq = db.getNextSequence(user.unitId, year, deptCode, subjectCode, 'INWARD');
    const diaryNo = `${String(seq).padStart(4, '0')}/${year}/MDPM-INW`;

    const record = {
      inwardId: 'inw-' + Date.now(),
      diaryNo,
      date: new Date().toISOString(),
      deliveryMode,
      senderType,
      senderName,
      senderMobile,
      extRef: extRef || 'N/A',
      deptCode,
      subjectCode,
      subject,
      seat: targetSeat || user.activeSeat,
      status: 'PENDING_ACCEPTANCE',
      createdBy: user.employeeCode,
    };

    db.inwards.unshift(record);
    return res.status(201).json({ message: 'Inward Diarized Successfully', record });
  }

  static getAll(req: AuthenticatedRequest, res: Response) {
    return res.json({ inwards: db.inwards });
  }

  static acceptToPR(req: AuthenticatedRequest, res: Response) {
    const { inwardId } = req.params;
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const inw = db.inwards.find(i => i.inwardId === inwardId);
    if (!inw) return res.status(404).json({ error: 'Inward record not found' });

    inw.status = 'PR_ACCEPTED';
    inw.acceptedAt = new Date().toISOString();
    inw.acceptedBy = user.activeSeat;

    return res.json({ message: `Inward ${inw.diaryNo} accepted into Personal Register of ${user.activeSeat}`, record: inw });
  }
}
