import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'

const router = express.Router();

const getKeywords = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getKeywords');
  try {
    const result = await keywordQuery.getKeyword();
    let keywordMap = new Map();
    result.map((current) => {
      if(!keywordMap.has(`${current.categoryID}_${current.categoryName}`)) {
        keywordMap.set(`${current.categoryID}_${current.categoryName}`, new Array());
      }
      keywordMap.get(`${current.categoryID}_${current.categoryName}`).push({'keywordID': current.keywordID, 'keywordName': current.keywordName});
    })

    const data = Object.fromEntries(keywordMap);

    res.status(200).send(
      {
        'message': 'get keywords success',
        'keywords': data
      }
    )
  } catch (e) {
    res.status(500).send(
      {
        'message': 'get keywords fail - unexpected errors occur in db'
      }
    )
  }
}

const renderKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getKeywords');
  try {
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
        'message': 'render keywords success',
        'keywords': data
      }
    )
  } catch (e) {
    res.status(500).send(
      {
        'message': 'render keywords fail - unexpected errors occur in db'
      }
    )
  }
}

const createKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createKeyword');
  if (req.body.name === null || req.body.name === '' || req.body.name === undefined === undefined) {
    res.status(400).send(
      {
        'message': 'create keyword fail - please input name'
      }
    )
  }
  if (req.body.categoryID === null || req.body.categoryID === '' || req.body.categoryID === undefined) {
    res.status(400).send(
      {
        'message': 'create keyword fail - please input category ID'
      }
    )
  }
  const data =
  [
    req.body.name,
    req.body.categoryID
  ];
  try {
  const result = await keywordQuery.createKeyword(data);
  res.status(200).send(
    {
      'message': 'create keyword success',
    }
  );
  } catch (e) {
    res.status(500).send()
  }
};

const deleteKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteKeyword');
  if (req.params.id === null || req.params.id === '' || req.params.id === undefined) {
    res.status(400).send(
      {
        'message': 'delete keyword fail - please input keyword id'
      }
    )
  }
  const data =
  [
    req.params.id
  ];
  try {
    const result = await keywordQuery.deleteKeyword(data);
    res.status(200).send (
      {
        'message': 'delete keyword success',
      }
    )
  } catch (e) {
    res.status(500).send()
  }
};

router.get('/', renderKeyword);
router.get('/data', getKeywords);
router.post('/', createKeyword);
router.delete('/:id', deleteKeyword);

export = router;
