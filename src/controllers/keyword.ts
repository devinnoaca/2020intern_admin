import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'

const router = express.Router();

const getKeywords = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {

    //DB 데이터 전처리 전까진 해당 Dummy Data를 사용할겁니다.
    const result = [
        {
            category: {id: 1, name: 'develop'}, 
            keyword : [{id: 1, name: 'java'}, {id: 2, name: 'javascript'}, {id: 3, name: 'python'}]
          },
          {
            category: {id: 2, name: 'design'}, 
            keyword : [{id: 4, name: 'html'}, {id: 5, name: 'css'}, {id: 6, name: 'scss'}]
          },
          {
            category: {id: 3, name: 'data'},
            keyword : [{id: 7, name: 'mongoDB'}, {id: 8, name: 'mySQL'}, {id: 9, name: 'R'}]
          },
          {
            category: {id: 4, name: 'skill'}, 
            keyword : [{id: 10, name: '프로젝트관리'}, {id: 11, name: '데이터분석'}, {id: 12, name: '정보보안'}]
          },
    ];
    res.status(200).render('keyword',
      {
        'message': 'get keywords success',
        'keywords': result
      }
    )
    console.log('controller: getKeywords');
}

const createKeyword = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data =
    [
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
