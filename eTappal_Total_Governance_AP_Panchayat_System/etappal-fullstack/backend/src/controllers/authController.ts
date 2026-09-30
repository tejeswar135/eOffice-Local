import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'ap-panchayat-tappal-secret-key-2026';

export class AuthController {
  static login(req: Request, res: Response) {
    const { employeeCode, password } = req.body;

    if (!employeeCode || !password) {
      return res.status(400).json({ error: 'Employee code and password are required.' });
    }

    const user = db.users.find(u => u.employeeCode === employeeCode && u.passwordHash === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid Employee Code or Password.' });
    }

    const payload = {
      userId: user.userId,
      employeeCode: user.employeeCode,
      fullName: user.fullName,
      designation: user.designation,
      activeSeat: user.activeSeat,
      allowedSeats: user.allowedSeats,
      unitId: user.unitId,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    return res.json({
      message: 'Authentication successful',
      token,
      user: payload,
    });
  }

  static switchSeat(req: AuthenticatedRequest, res: Response) {
    const { targetSeat } = req.body;
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    if (!req.user.allowedSeats.includes(targetSeat)) {
      return res.status(403).json({ error: `Not authorized to operate seat ${targetSeat}` });
    }

    const updatedPayload = { ...req.user, activeSeat: targetSeat };
    const token = jwt.sign(updatedPayload, JWT_SECRET, { expiresIn: '12h' });

    return res.json({
      message: `Active seat switched to ${targetSeat}`,
      token,
      user: updatedPayload,
    });
  }

  static getProfile(req: AuthenticatedRequest, res: Response) {
    return res.json({ user: req.user });
  }
}
