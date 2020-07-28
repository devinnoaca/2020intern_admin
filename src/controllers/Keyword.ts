import * as express from 'express';

const createKeyword = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
        {
          'status': 200
        }
      );
  console.log('createKeyword');
};

const deleteKeyword = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
  response.status(200).send(
        {
          'status': 200
        }
      );
  console.log('deleteKeyword');
};

const router = express.Router();

router.post('/', createKeyword);
router.delete('/:id', deleteKeyword);

export = router;
