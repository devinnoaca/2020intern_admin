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
          category: 'develop', 
          keyword : ['java_develop', 'javascript_develop', 'python_develop']
      },
      {
          category: 'design', 
          keyword : ['html_design', 'CSS_design', 'SCSS_design']
      },
      {
          category: 'data', 
          keyword : ['MongoDB_data', 'MySQL_data', 'MariaDB_data', 'SQL_data', 'RDBMS_data', 'Oracle_data', 'R_data']
      },
      {
          category: 'skill', 
          keyword : ['프로젝트관리_skill', '데이터분석_skill', '정보보안_skill', 'VBA_skill']
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
