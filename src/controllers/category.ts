import * as express from 'express';
import categoryQuery from '../dao/categoryDAO'
import {checkParameter} from '../lib/lib'

const router = express.Router();

const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createCategory');
  if (checkParameter([req.body.name])) {
    res.status(400).send(
      {
        'message': 'create category'
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
    res.status(500).send()
  }
  
};

const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteCategory');
  if (checkParameter([req.params.id])) {
    res.status(400).send()
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
    res.status(500).send()
  }
};

router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export = router;