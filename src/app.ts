import { Router } from 'express';
import * as userRoute from './controllers/User';
import * as keywordRoute from './controllers/Keyword';
import * as categoryRoute from './controllers/Category';

const router = Router();
router.use('/user', userRoute);
router.use('/keyword', keywordRoute);
router.use('/category', categoryRoute);

export default router;
