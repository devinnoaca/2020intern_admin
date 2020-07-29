import * as express from 'express';

const createKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(200).send(
        {
          'status': 200
        }
      );
  console.log('createKeyword');
};

const deleteKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(200).send(
        {
          'status': 200
        }
      );
  console.log('deleteKeyword');
};

const getKeyword = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log('run getKeyword API');
  res.status(200).render('keyword', 
    {
      'status': 200,
      'data': [
        {
            category: '개발/프로그래밍', 
            keyword : ['java', 'javascript', 'python']
        },
        {
            category: '디자인', 
            keyword : ['html', 'CSS', 'SCSS']
        },
        {
            category: '데이터사이언스', 
            keyword : ['MongoDB', 'MySQL', 'MariaDB', 'SQL', 'RDBMS', 'Oracle', 'R']
        },
        {
            category: '업무스킬', 
            keyword : ['프로젝트 관리', '데이터 분석', '정보보안', 'VBA']
        },
      ],
    });
}

const router = express.Router();

router.get('/', getKeyword);
router.post('/', createKeyword);
router.delete('/:id', deleteKeyword);

export = router;
