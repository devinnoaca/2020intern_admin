import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'

const router = express.Router();

const getKeywords = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const result = await keywordQuery.getKeyword();

    let keywordMap = new Map();
    result.map((current) => {
      if(!keywordMap.has(`${current.categoryID}_${current.categoryName}`)) {
        keywordMap.set(`${current.categoryID}_${current.categoryName}`, new Array());
      }
      keywordMap.get(`${current.categoryID}_${current.categoryName}`).push({'keywordID': current.keywordID, 'keywordName': current.keywordName});
    })

    const data = Object.fromEntries(keywordMap);

    res.status(200).render('keyword/keyword',
      {
        'message': 'get keywords success',
        'keywords': data
      }
    )
    console.log('controller: getKeywords');
}

const createKeyword = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data = [
      req.body.name,
      req.body.categoryID
    ];
    const result = keywordQuery.createKeyword(data);
    res.status(200).send(
      {
        'message': 'create keyword success',
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
    res.status(200).send (
      {
        'message': 'delete keyword success',
      }
    )

    console.log('controller: deleteKeyword');
};

router.get('/', getKeywords);
router.post('/', createKeyword);
router.delete('/:id', deleteKeyword);

export = router;
