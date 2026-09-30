import { Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/auth';

export class FileController {
  static create(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { deptCode, subjectCode, subjectTitle, retentionClass, custodySeat } = req.body;
    const year = new Date().getFullYear();
    const seq = db.getNextSequence(user.unitId, year, deptCode, subjectCode, 'FILE');
    const fileNumber = `SKLM-SRVK-MDPM/${deptCode}/${subjectCode}-${String(seq).padStart(4, '0')}/${year}`;

    const file = {
      fileId: 'fil-' + Date.now(),
      fileNumber,
      subject: subjectTitle,
      retentionClass,
      currentSeat: custodySeat || user.activeSeat,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      linkedInwards: [],
    };

    db.files.unshift(file);
    return res.status(201).json({ message: 'eFile created', file });
  }

  static getAll(req: AuthenticatedRequest, res: Response) {
    return res.json({ files: db.files });
  }

  static getDetail(req: AuthenticatedRequest, res: Response) {
    const { fileId } = req.params;
    const file = db.files.find(f => f.fileId === fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const notes = db.notes.filter(n => n.fileId === fileId);
    const linkedInwards = db.inwards.filter(i => file.linkedInwards.includes(i.diaryNo));

    return res.json({ file, notes, linkedInwards });
  }

  static addNote(req: AuthenticatedRequest, res: Response) {
    const { fileId } = req.params;
    const { type, content } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const file = db.files.find(f => f.fileId === fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const existingNotes = db.notes.filter(n => n.fileId === fileId);
    const note = {
      noteId: 'not-' + Date.now(),
      fileId,
      seqNo: existingNotes.length + 1,
      type: type || 'GREEN_NOTE',
      content,
      authorSeat: user.activeSeat,
      authorName: user.fullName,
      timestamp: new Date().toISOString(),
    };

    db.notes.push(note);
    return res.status(201).json({ message: 'Note recorded', note });
  }

  static linkInward(req: AuthenticatedRequest, res: Response) {
    const { fileId } = req.params;
    const { diaryNo } = req.body;

    const file = db.files.find(f => f.fileId === fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    if (!file.linkedInwards.includes(diaryNo)) {
      file.linkedInwards.push(diaryNo);
    }

    const inw = db.inwards.find(i => i.diaryNo === diaryNo);
    if (inw) {
      inw.status = 'PUT_IN_FILE';
    }

    return res.json({ message: `Inward ${diaryNo} linked to file ${file.fileNumber}` });
  }
}
