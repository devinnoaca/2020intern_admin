import {Router} from 'express';
import * as userRoute from './controller/user';
import * as keywordRoute from './controller/keyword';
import * as categoryRoute from './controller/category';

const router = Router();
router.use('/user', userRoute);
router.use('/keyword', keywordRoute);
router.use('/category', categoryRoute);

export default router;
