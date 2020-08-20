import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'
import {checkParameter} from '../lib/lib'

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
  if (checkParameter([req.body.name, req.body.categoryID])) {
    res.status(400).send(
      {
        'message': 'create keyword'
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
  if (checkParameter([req.params.id])) {
    res.status(400).send(
      {
        'message': 'delete keyword'
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
