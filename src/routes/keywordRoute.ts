import { Router } from 'express';

import { addKeywordHandler, getSortedKeywordsHandler } from '../controllers/keywordController';

const router = Router();

router.post('/keywords', addKeywordHandler);
router.get('/keywords', getSortedKeywordsHandler);

export default router;
