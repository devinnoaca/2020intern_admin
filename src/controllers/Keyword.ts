import * as express from 'express';

const createKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log('run createKeyword API');
  console.log(req.body);
  res.status(200).send(
        {
          'status': 200
        }
      );  
};

const deleteKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log('run deleteKeyword API');
  console.log(`'${req.params.name}' 키워드 삭제 요청`);
  res.status(200).send(
        {
          'status': 200,
          'result': "삭제 성공"
        }
      );
  
};

const getKeywords = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log('run getKeywords API');
  res.status(200).render('keyword',
    {
      'status': 200,
      'data': [
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
      ],
    });
}

const searchKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log('run searchKeyword API');
  console.log(req.body);
  res.status(200).send(
    {
      status: 200,
      result: '검색결과 없음'
    }
  );
};



const router = express.Router();

router.get('/', getKeywords);
router.post('/', createKeyword);
router.delete('/:name', deleteKeyword);
router.post('/search', searchKeyword);

export = router;
