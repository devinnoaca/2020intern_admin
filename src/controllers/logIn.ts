import * as express from 'express';
import loginQuery from '../dao/logInDAO'
import { secretObj } from '../../config/config';
const jwt = require('jsonwebtoken'); // module import

const router = express.Router();

const logIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("controller: log in");
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'log in fail - please input id'
      }
    )
  } else if (req.body.password === null || req.body.password === '' || req.body.password === undefined) {
    res.status(400).send(
      {
        'message': 'log in fail - please input password'
      }
    )
  }
  const data =
  [
    req.body.id,
    req.body.password
  ]
  try {
    const result = await loginQuery.logIn(data);
    const token = jwt.sign(
      {
        'usn': `${result[0].usn}`,
      },
      secretObj.secret,
      {
        expiresIn: '1h'
      }
    )
    res.cookie('token', token)
    res.status(200).redirect('/dashboard')
  } catch (e) {
    res.status(500).send()
  }
}

router.post('/', logIn)
export = router;