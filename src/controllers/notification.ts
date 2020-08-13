import * as express from 'express';
import notificationQuery from '../dao/notificationDAO'
import { route } from './user';

const router = express.Router();

const createNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createNotification');
  if (req.body.message === null || req.body.message === '' || req.body.message === undefined) {
    res.status(400).send(
      {
        'message': 'create notification fail - please input message'
      }
    )
  }
  let data: Array<any> =
  [
    1, // 공지
    req.body.message
  ];
  try {
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

    res.status(200).redirect('/notification');
  } catch (e) {
    res.status(500).send()
  }
}
const getNotifications = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await notificationQuery.getNotifications();
    res.status(200).render('notification/notification', {
      "notifications" : result   
    });
  } catch (e) {
    res.status(500).send()
  }

}

const getNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getNotification')
  if (req.body.type === null || req.body.type === '' || req.body.type === undefined) {
    res.status(400).send(
      {
        'message': 'get notification fail - please input type'
      }
    )
  }
  else if (req.body.receiver_ID === null || req.body.receiver_ID === '' || req.body.receiver_ID === undefined) {
    res.status(400).send(
      {
        'message': 'get notification fail - please input receiver id'
      }
    )
  }
  else if (req.body.sender_ID === null || req.body.sender_ID === '' || req.body.sender_ID === undefined) {
  
    res.status(400).send(
      {
        'message': 'get notification fail - please input sender id'
      }
    )
  }
  try {
    let data;
    if (req.body.is_checked === 'all'){
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
    
    res.status(200).render('notification/notification',
      {
        'message': 'get notifiation success',
        'notifications': result
      }
    )
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserNotification = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUserNotification')
  if (req.params.id === null || req.params.id === '' || req.params.id === undefined) {
    res.status(400).send(
      {
        'message': 'delete user notification fail - please input id'
      }
    )
  }
  const data = 
  [
    req.params.id
  ]
  try {
    const result = await notificationQuery.deleteUserNotification(data);
    res.status(200).send(
      {
        'message': 'delete notification success'
      }
    )
  } catch {
    res.status(500).send()
  }
}

router.get('/', getNotifications);
router.post('/', createNotification);
router.post('/search', getNotification);
router.delete('/:id', deleteUserNotification);
export = router;