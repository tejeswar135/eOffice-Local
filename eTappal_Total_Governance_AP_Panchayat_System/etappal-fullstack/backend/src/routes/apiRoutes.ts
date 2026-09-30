import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { InwardController } from '../controllers/inwardController';
import { FileController } from '../controllers/fileController';
import { OutwardController } from '../controllers/outwardController';
import { SyncController } from '../controllers/syncController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// 1. Auth & Session Routes
router.post('/auth/login', AuthController.login);
router.post('/auth/switch-seat', authenticateToken, AuthController.switchSeat);
router.get('/auth/profile', authenticateToken, AuthController.getProfile);

// 2. Inward Routes
router.post('/inwards', authenticateToken, InwardController.create);
router.get('/inwards', authenticateToken, InwardController.getAll);
router.patch('/inwards/:inwardId/accept', authenticateToken, InwardController.acceptToPR);

// 3. File & Noting Routes
router.post('/files', authenticateToken, FileController.create);
router.get('/files', authenticateToken, FileController.getAll);
router.get('/files/:fileId', authenticateToken, FileController.getDetail);
router.post('/files/:fileId/notes', authenticateToken, FileController.addNote);
router.post('/files/:fileId/link-inward', authenticateToken, FileController.linkInward);

// 4. Outward Routes
router.post('/outwards', authenticateToken, OutwardController.issue);
router.get('/outwards', authenticateToken, OutwardController.getAll);

// 5. Offline-to-Online Sync Route
router.post('/sync/batch', authenticateToken, SyncController.syncBatch);

export default router;
