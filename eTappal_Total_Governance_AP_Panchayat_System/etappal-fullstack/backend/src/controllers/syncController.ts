import { Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/auth';

export class SyncController {
  static syncBatch(req: AuthenticatedRequest, res: Response) {
    const { batch } = req.body;
    if (!Array.isArray(batch)) {
      return res.status(400).json({ error: 'Batch array required' });
    }

    const processed = [];
    for (const item of batch) {
      if (item.type === 'INWARD') {
        db.inwards.push(item.payload);
      } else if (item.type === 'FILE') {
        db.files.push(item.payload);
      } else if (item.type === 'NOTE') {
        db.notes.push(item.payload);
      } else if (item.type === 'OUTWARD') {
        db.outwards.push(item.payload);
      }
      processed.push({ clientUuid: item.clientUuid, status: 'COMMITTED' });
    }

    return res.json({ message: 'Offline transactions synced', processedCount: processed.length });
  }
}
