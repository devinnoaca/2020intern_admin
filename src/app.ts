import { Router } from 'express';
import * as userRoute from './controllers/user';
import * as keywordRoute from './controllers/keyword';
import * as categoryRoute from './controllers/category';
import * as matchingRoute from './controllers/matching';
import * as notificationRoute from './controllers/notification';
import * as loginRoute from './controllers/logIn';

const router = Router();
router.use('/user', userRoute);
router.use('/keyword', keywordRoute);
router.use('/category', categoryRoute);
router.use('/matching', matchingRoute);
router.use('/notification', notificationRoute);
router.use('/login', loginRoute);

export default router;