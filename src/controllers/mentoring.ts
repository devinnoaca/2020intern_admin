import * as express from 'express';

const router = express.Router();

const createMentoring = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = [
    req.body.name
  ];
//   const result = await categoryQuery.createCategory(data);
  res.status(200).send(
    {
      'message': 'create category success',
    }
  );
  console.log('controller: createMentoring');
};

const deleteMentoring = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.params.id
  ];
  res.status(200).send(
    {
      'message': 'delete category success',
    }
  )
  console.log('controller: deleteCategory');
};

const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    let result = [
        {
            id: 0,
            mentor: 0,
            mentee: 1,
            req_date: '2020/07/30',
            is_checked: false,
            state: 0,
        }
    ]

    res.status(200).render('mentoring/mentoring',
      {
        message: 'get category success',
        mentoring : result
      }
    )
    console.log('controller: index');
  };

router.get('/', index);
router.post('/', createMentoring);
router.delete('/:id', deleteMentoring);

export = router;
