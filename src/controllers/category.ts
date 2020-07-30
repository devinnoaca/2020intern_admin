import * as express from 'express';
import categoryQuery from '../dao/categoryDAO'

const router = express.Router();

const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.body.name
  ];
  const result = await categoryQuery.createCategory(data);
  res.status(200).send(
    {
      'message': 'create category success',
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
      'message': 'delete category success',
    }
  )
  console.log('controller: deleteCategory');
};

router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export = router;
