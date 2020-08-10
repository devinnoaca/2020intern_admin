import * as express from 'express';
import notificationQuery from '../dao/notificationDAO'
import { route } from './user';

const router = express.Router();

const createNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let data: Array<any> =
  [
    1, // 공지
    req.body.message
  ];
  let result;
  if (req.body.receiver === 'all') {
    result = await notificationQuery.createNotificationToAll(data);
  } else if (req.body.receiver === 'mentor') {
    result = await notificationQuery.createNotificationToMentor(data);
  } else if (req.body.receiver === 'mentee') {
    result = await notificationQuery.createNotificationToMentee(data);
  } else {
    data.push(req.body.receiver_ID)
    result = await notificationQuery.createNotification(data);
  }

  res.status(200).send(
    {
      'message': 'create notification success'
    }
  );
  console.log('controller: createNotification');
}

const searchNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let data;
  if (req.body.is_checked === null){
    data = 
    [
      req.body.type,
      0,
      1,
      req.body.receiver_ID,
      req.body.sender_ID
    ]
  } else {
    data = 
    [
      req.body.type,
      req.body.is_checked,
      req.body.is_checked,
      req.body.receiver_ID,
      req.body.sender_ID
    ]
  }
  const result = await notificationQuery.getUserNotification(data);
  res.status(200).send(
    {
      'message': 'get notifiation success',
      'notifications': result
    }
  )
}

const deleteUserNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    req.params.id
  ]
  const result = await notificationQuery.deleteUserNotification(data);
  res.status(200).send(
    {
      'message': 'delete notification success'
    }
  )
}

router.post('/create', createNotification);
router.post('/search', searchNotification);
router.delete('/:id', deleteUserNotification);
export = router;