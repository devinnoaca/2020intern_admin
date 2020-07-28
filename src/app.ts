import {Router} from 'express';
import * as userRoute from './Controller/User';
import * as keywordRoute from './Controller/Keyword';
import * as categoryRoute from './Controller/Category';

const router = Router();
router.use('/user', userRoute);
router.use('/keyword', keywordRoute);
router.use('/category', categoryRoute);

export default router;
