import * as express from 'express';
import userQuery from '../dao/userDAO'

const router = express.Router();

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //permission을 따로 안받고 있음................
  const data = 
  [
    req.body.id,
    req.body.email,
    req.body.password,
    req.body.name,
    null,
    0,
    0,
    false,
    0,
    req.body.type
  ]

  console.log(data);

  const result = await userQuery.createUser(data);

  res.status(200).redirect('user');
  console.log('controller: createUser');
};

const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = await userQuery.getUsers();

  res.status(200).render('user/user',
    {
      'message': 'get user list success',
      'users': result
    }
  );
  
  console.log('controller: getUsers');
};

const getUser = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const param = 
    [
      parseInt(req.params.usn)
    ];
  let result = await userQuery.getUser(param);
  let careerID: Array<Number> = new Array();
  let career: Array<String> = new Array();
  result.map( (current, index, result) => {
    careerID.push(current.careerID);
    career.push(current.career);
  })
  result = [result[0]];
  result[0].careerID = careerID;
  result[0].career = career;
  console.log(result);
  res.status(200).render('user/userdetail' ,
    {
      'message': 'success',
      'user': result
    }
  )
  console.log('controller: getUser');
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    parseInt(req.params.usn)
  ];
  const result = await userQuery.deleteUser(data);
res.status(200).send(
    {
    'message': 'delete user success',
    }
  );
console.log('controller: deleteUser');
};

const modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.notification,
    req.body.authorization,
    req.body.permission,
    req.body.type,
    parseInt(req.params.usn)
  ];
  const result = await userQuery.modifyUser(data);
res.status(200).send(
      {
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
