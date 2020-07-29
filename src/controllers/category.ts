import * as express from 'express';
import categoryQuery from '../dao/categoryDAO'

const router = express.Router();

const getCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    req.params.id
  ];
  const result = await categoryQuery.getCategory(data);
  res.status(200).send(
    {
      'status': 200,
      'message': 'get category success',
      'data': result
    }
  );
  console.log('controller: createCategory');

  
};

const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.params.name
  ];
  const result = await categoryQuery.getCategory(data);
  res.status(200).send(
    {
      'status': 200,
      'message': 'create category success',
      'data': result
    }
  );
  console.log('controller: createCategory');
};

const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.params.id
  ];
  const result = await categoryQuery.deleteCategory(data);
  res.status(200).send(
    {
      'status': 200,
      'message': 'delete category success',
      'data': result
    }
  )
  console.log('controller: deleteCategory');
};

router.post('/', createCategory);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);

export = router;
