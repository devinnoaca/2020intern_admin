import { Router } from 'express';
import * as userRoute from './controllers/user';
import * as keywordRoute from './controllers/keyword';
import * as categoryRoute from './controllers/category';
import * as matchingRoute from './controllers/matching'
const router = Router();
router.use('/user', userRoute);
router.use('/keyword', keywordRoute);
router.use('/category', categoryRoute);
router.use('/matching', matchingRoute);

export default router;
