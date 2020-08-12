import * as express from 'express';

import matchingDAO from '../dao/matchingDAO'

const router = express.Router();


//날짜시간 포맷 변환
const dateFormatConvert = (date: string): string => {
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
    )
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

const renderModifyForm = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

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
    dateFormatConvert(req.body.request_time),
    dateFormatConvert(req.body.response_time),
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

  let resultData = [];

  if (req.query.query_type === 'SEARCH') { //추후 페이징 쿼리와 구분하기 위해 임시로 구분자쿼리를 함께 보냈습니다.
    // 매칭정보 검색
    let inputData = [
        dateFormatConvert(String(req.query.start_date)),
        dateFormatConvert(String(req.query.end_date))
      ];

    let extraQuery = '';

    if (req.query.state !== '-1' && req.query.state !== null) {
      extraQuery += ` AND m.state = ${req.query.state}`;
    }

    if (req.query.mentee_id !== null && req.query.mentee_id !== '') {
      extraQuery += ` AND mentee.ID = '${req.query.mentee_id}'`;
    }
    if (req.query.mentor_id !== null && req.query.mentor_id !== '') {
      extraQuery += ` AND mentor.ID = '${req.query.mentor_id}'`;
    }
    extraQuery += ';';

    resultData = await matchingDAO.searchMatching(inputData, extraQuery);
  } else {
    // 매칭정보 리스트 요청
    resultData = await matchingDAO.getAllMatching();
  }

  res.status(200).render('matching/matching',
    {
      'message': 'get category success',
      'matching': resultData
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

router.get('/', getMatching);
router.get('/:id', getMatchingDetail);
router.get('/update/:id', renderModifyForm);
router.put('/update/:id', modifyMatching)
router.post('/', createMatching);
router.delete('/:id', deleteMatching);

export = router;
