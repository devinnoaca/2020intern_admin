import * as express from 'express';


const router = express.Router();

const createCategory = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
        {
          'status': 200
        }
      );
  console.log('createCategory');
};

const getCategory = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
      {
        'status': 200,
        'keywords': ['Java', 'C++', 'Server', 'Web']
      }
    );
  console.log('getCategory');
};

const deleteCategory = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
        {
          'status': 200
        }
      );
  console.log('deleteCategory');
};


router.post('/', createCategory);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);

export = router;
