import { Router } from 'express';

import { userAuth } from '../controllers/authenticationController';

const router = Router();

router.post('/auth', userAuth);

export default router;
