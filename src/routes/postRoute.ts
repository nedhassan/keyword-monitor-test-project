import { Router } from 'express';

import { getFilteredPostsHandler, getUpdatedPostsHandler } from '../controllers/postController';

const router = Router();

router.get('/posts', getFilteredPostsHandler);
router.get('/recent-posts', getUpdatedPostsHandler);

export default router;
