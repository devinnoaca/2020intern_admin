import * as express from 'express';
import matchingDAO from '../dao/matchingDAO'

const router = express.Router();


//날짜시간 포맷 변환
const dateFormatConvert = (date:string):string => {
  return (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
}

const createMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createMatching');
  if (req.body.mentorUSN === null || req.body.mentorUSN === '') {
    res.status(400).send(
      {
        'message': 'create matching fail - please input mentor usn'
      }
    )
  }
  if (req.body.menteeUSN === null || req.body.menteeUSN === '') {
    res.status(400).send(
      {
        'message': 'create matching fail - please input mentee usn'
      }
    )
  }
  if (req.body.state === null || req.body.state === '') {
    res.status(400).send(
      {
        'message': 'create matching fail - please input state'
      }
    )
  }

  const data = [
    req.body.mentor_USN, //mentor_USN
    req.body.mentee_USN, //mentee_USN
    dateFormatConvert(req.body.request_time),
    req.body.state,
    req.body.is_checked,
    req.body.request_message,
    req.body.response_message
  ];

  try {
    const result = await matchingDAO.createMatching(data);
    res.status(200).send(
      {
        'message': 'create matching success'
      }
    ).redirect('/matching');
  } catch (e) {
    res.status(500).send(
      {
        'message': 'create matching fail - unexpected errors occur in db'
      }
    )
  }
};


const deleteMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteCategory');
  if (req.params.id === null || req.params.id === '') {
    res.status(400).send(
      {
        'message': 'delete matching fail - please input matching id'
      }
    )
  }
  const data = [
    req.params.id
  ];

  try {
    const result = await matchingDAO.deleteMatching(data);
    res.status(200).send(
    {
      'message': 'delete matching success'
    }
  )
  } catch (e) {
    res.status(500).send(
      {
        'message': 'delete matching fail - unexpected errors occur in db'
      }
    )
  }
};

const modifyForm = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  let data = await matchingDAO.getMatching([req.params.id]);
  res.status(200).render('matching/matchingUpdate',
    {
      'message': 'get modify form success',
      'matching': data[0]
    }
  )
  console.log('controller: updateMatching');
}

const modifyMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: updateMatching');
  if (req.body.mentor_USN === null || req.body.mentor_USN === '') {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input mentor usn'
      }
    )
  }
  if (req.body.mentee_USN === null || req.body.mentee_USN === '') {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input mentee usn'
      }
    )
  }
  if (req.body.state === null || req.body.state === '') {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input state'
      }
    )
  }
  if (req.body.is_checked === null || req.body.is_checked === '') {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input isChecked'
      }
    )
  }
  const data = [
    req.body.mentor_USN,
    req.body.mentee_USN,
    new Date(), //req.body.request_time,
    new Date(), //req.body.response_time,
    req.body.state,
    req.body.request_message,
    req.body.response_message,
    req.body.is_checked,
    parseInt(req.params.id)
  ];

  try {
    const result = await matchingDAO.modifyMatching(data);
    res.status(200).send(
      {
        message: 'get modify matching success',
        matching: result
      }
    )
  } catch (e) {
    res.status(500).send(
      {
        'message': 'modify matching fail - unexpected errors occur in db'
      }
    )
  }
}



const getMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let data = await matchingDAO.getAllMatching();

  res.status(200).render('matching/matching',
    {
      'message': 'get category success',
      'matching': data
    }
  )
  console.log('controller: getMatching');
};

const getMatchingDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let data = await matchingDAO.getMatching([req.params.id]);

  res.status(200).render('matching/matchingDetail',
    {
      'message': 'get category success',
      'matching': data[0]
    }
  )
  console.log('controller: getMatching');
};

const searchMatching = async (req: express.Request, res: express.Response, nex: express.NextFunction) => {
  let data = 
  [
    dateFormatConvert(req.body.start_date),
    dateFormatConvert(req.body.end_date)
  ];
  let extraQuery ='';
  if (req.body.state !== '-1' && req.body.state !== null) {
    extraQuery += ` AND m.state = ${req.body.state}`;
  }
  if (req.body.mentee_id !== null && req.body.mentee_id !== '') {
    extraQuery += ` AND mentee.ID = '${req.body.mentee_id}'`;
  }
  if (req.body.mentor_id !== null && req.body.mentor_id !== '') {
    extraQuery += ` AND mentor.ID = '${req.body.mentor_id}'`;
  }
  extraQuery += ';';
  const result = await matchingDAO.searchMatching(data, extraQuery);

  res.status(200).send(
    {
      'message': 'search matching success',
      'result': result
    }
  )
  console.log('controller: searchMatching');
}

router.get('/', getMatching);
router.get('/:id', getMatchingDetail);
router.get('/update/:id', modifyForm);
router.put('/update/:id', modifyMatching)
router.post('/', createMatching);
router.delete('/:id', deleteMatching);
router.post('/search', searchMatching);
export = router;
