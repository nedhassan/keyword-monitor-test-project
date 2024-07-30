import { Router } from 'express';

import {  getLogsHandler } from '../controllers/loggingController';

const router = Router();

router.get('/app-logs', getLogsHandler);

export default router;
