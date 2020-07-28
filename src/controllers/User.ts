import * as express from 'express';

const router = express.Router();

const createUser = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send('Success');
  console.log('createUser');
};

const getUsers = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  console.log('getUsers');
  response.status(200).render('usermanage', 
    {
      'status': 200,
      'users': [
        {
          'id': 1,
          'type': 0,
          'name': 'Kim',
          'email': 'abc@def.ghi' 
        },
        {
          'id': 2,
          'type': 1,
          'name': 'Park',
          'email': '123@456.789'
        }
      ]
    }
  );
};

const getUser = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
    {
      'status': 200,
      'id': 1,
      'type': 0,
      'name': 'Kim',
      'email': 'abc@def.ghi'
    }
  );
  console.log('getUser');
};

const deleteUser = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
response.status(200).send(
    {
    'status': 200
    }
  );
console.log('deleteUser');
};

const modifyUser = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
response.status(200).send(
      {
        'status': 200
      }
    );
console.log('modifyUser');
};

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', modifyUser);

export = router;
