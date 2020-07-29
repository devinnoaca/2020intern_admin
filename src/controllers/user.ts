import * as express from 'express';
import userQuery from '../dao/userDAO'

const router = express.Router();

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    req.params.id,
    req.params.email,
    req.params.password,
    req.params.name,
    null,
    null,
    0,
    false,
    0,
    req.params.type
  ]
  const result = await userQuery.createUser(data)
  res.status(200).send(
    {
      'status': 200,
      'message': 'create user success',
      'data': result
    }
  );
  console.log('controller: createUser');
};

const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = await userQuery.getUsers();
  res.status(200).send(
    {
      'status': 200,
      'message': 'get user list success',
      'data': result
    }
  )
  console.log('controller: getUsers');
};

const getUser = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data = 
    [
      parseInt(req.params.usn)
    ];
  const result = await userQuery.getUser(data);
  res.status(200).send(
    {
      'status': 200,
      'message': 'success',
      'data': result
    }
  )
  console.log('controller: getUser');
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    parseInt(req.params.usn)
  ];
  const result = await userQuery.getUser(data);
res.status(200).send(
    {
    'status': 200,
    'message': 'delete user success',
    'data': result
    }
  );
console.log('controller: deleteUser');
};

const modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.params.email,
    req.params.password,
    req.params.name,
    req.params.image,
    req.params.description,
    req.params.notification,
    req.params.authorization,
    req.params.permission,
    req.params.type
  ];
  const result = await userQuery.modifyUser(data);
res.status(200).send(
      {
        'status': 200,
        'message': 'modify user success'
      }
    );
console.log('controller: modifyUser');
};

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:usn', getUser);
router.delete('/:usn', deleteUser);
router.put('/:usn', modifyUser);

export = router;
