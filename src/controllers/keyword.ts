import * as express from 'express';
import keywordQuery from '../dao/keywordDAO'

const router = express.Router();

const getKeywords = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const data = 
    [
      req.params.id
    ]
    // const result = await keywordQuery.getKeyword(data);
    const result = [
      {
          category: '개발/프로그래밍', 
          keyword : ['java_개발', 'javascript_개발', 'python_개발']
      },
      {
          category: '디자인', 
          keyword : ['html_디자인', 'CSS_디자인', 'SCSS_디자인']
      },
      {
          category: '데이터사이언스', 
          keyword : ['MongoDB_데이터사이언스', 'MySQL_데이터사이언스', 'MariaDB_데이터사이언스', 'SQL_데이터사이언스', 'RDBMS_데이터사이언스', 'Oracle_데이터사이언스', 'R_데이터사이언스']
      },
      {
          category: '업무스킬', 
          keyword : ['프로젝트관리_업무스킬', '데이터분석_업무스킬', '정보보안_업무스킬', 'VBA_업무스킬']
      },
    ];
    res.status(200).render('keyword',
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
      req.params.name
    ];
    // const result = keywordQuery.deleteKeyword(data);
    const result = 'success';
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
router.delete('/:name', deleteKeyword);

export = router;
