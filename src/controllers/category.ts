import * as express from 'express';
import categoryQuery from '../dao/categoryDAO'

const router = express.Router();

const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createCategory');
  if (req.body.name === null || req.body.name === '') {
    res.status(400).send(
      {
        'message': 'create category fail - please input category name'
      }
    )
  }

  const data =
  [
    req.body.name
  ];

  try {
    const result = await categoryQuery.createCategory(data);
    res.status(200).send(
    {
      'message': 'create category success',
    }
  );
  } catch (e) {
    res.status(500).send(
      {
        'message': 'create category fail - unexpected errors occur in db'
      }
    )
  }
  
};

const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteCategory');
  if (req.params.id === null) {
    res.status(400).send(
      {
        'message': 'delete category fail - please input category id'
      }
    )
  }
  const data =
  [
    req.params.id
  ];
  try {
    const result = await categoryQuery.deleteCategory(data);
    res.status(200).send(
      {
        'message': 'delete category success',
      }
    )
  } catch (e) {
    res.status(500).send(
      {
        'message': 'delete category fail - unexpected errors occur in db'
      }
    )
  }
};

router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export = router;
