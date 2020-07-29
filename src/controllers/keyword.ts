import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'

const router = express.Router();

const getKeywords = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data = 
    [
      req.params.id
    ]
    const result = await keywordQuery.getKeyword(data);
    res.status(200).send(
      {
        'status': 200,
        'message': 'get keywords success',
        'data': result
      }
    )
    console.log('controller: getKeywords');
}

const createKeyword = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data =
    [
      req.params.name,
      req.params.categoryID
    ];
    const result = keywordQuery.createKeyword(data);
    res.status(200).send(
      {
        'status': 200,
        'message': 'create keyword success',
        'data': result
      }
    );
    console.log('controller: createKeyword');
};

const deleteKeyword = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data =
    [
      req.params.id
    ];
    const result = keywordQuery.deleteKeyword(data);
    res.status(200).send(
      {
        'status': 200,
        'message': 'delete keyword success',
        'data': result
      }
    )

    console.log('controller: deleteKeyword');
};

router.get('/', getKeywords);
router.post('/', createKeyword);
router.delete('/:id', deleteKeyword);

export = router;
