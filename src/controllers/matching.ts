import * as express from 'express';

import matchingDAO from '../dao/matchingDAO'

const router = express.Router();


//날짜시간 포맷 변환
const dateFormatConvert = (date: string): string => {
  return (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
}

const createMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createMatching');

  if (req.body.mentor_ID === null || req.body.mentor_ID === '' || req.body.mentor_ID === undefined) {
    res.status(400).send(
      {
        'message': 'create matching fail - please input mentor ID'
      }
    )
  }
  else if (req.body.mentee_ID === null || req.body.mentee_ID === '' || req.body.mentee_ID === undefined) {
    res.status(400).send(
      {
        'message': 'create matching fail - please input mentee ID'
      }
    )
  }
  else if (req.body.state === null || req.body.state === '' || req.body.state === undefined) {
    res.status(400).send(
      {
        'message': 'create matching fail - please input state'
      }
    )
  }
  if (req.body.request_time === null || req.body.request_time === '' || req.body.request_time === undefined) {
    req.body.request_time = new Date();
  }
  if (req.body.is_checked === null || req.body.is_checked === '' || req.body.is_checked === undefined) {
    req.body.is_checked = 0;
  }

  let data;
  try {
    const mentor_USN = await matchingDAO.searchUSN([req.body.mentor_ID]);
    const mentee_USN = await matchingDAO.searchUSN([req.body.mentee_ID]);
    data = [
      mentor_USN[0].usn, //mentor_USN
      mentee_USN[0].usn, //mentee_USN
      dateFormatConvert(req.body.request_time),
      req.body.state,
      req.body.is_checked,
      req.body.request_message,
      req.body.response_message
    ];

  } catch (e) {
    console.log(e);
  }

  try {
    const result = await matchingDAO.createMatching(data);
    res.status(200).send(
      {
        'message': 'create matching success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
};


const deleteMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteCategory');
  if (req.params.id === null || req.params.id === '' || req.params.id === undefined) {
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
    res.status(500).send()
  }
};

const renderModifyForm = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (req.params.id === null || req.params.id === '' || req.params.id === undefined) {
    res.status(400).send(
      {
        'message': 'modify matching form fail - please input id'
      }
    )
  }
  try {
    const result = await matchingDAO.getMatching([req.params.id]);
    res.status(200).render('matching/matchingUpdate',
      {
        'message': 'get modify form success',
        'matching': result[0]
      }
    )
  } catch (e) {
    res.status(500).send()
  }
}

const modifyMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: updateMatching');
  if (req.body.mentor_ID === null || req.body.mentor_ID === '' || req.body.mentor_ID === undefined) {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input mentor id'
      }
    )
  }
  else if (req.body.mentee_ID === null || req.body.mentee_ID === '' || req.body.mentee_ID === undefined) {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input mentee id'
      }
    )
  }
  else if (req.body.state === null || req.body.state === '' || req.body.state === undefined) {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input state'
      }
    )
  }
  else if (req.body.is_checked === null || req.body.is_checked === '' || req.body.is_checked === undefined) {
    res.status(400).send(
      {
        'message': 'modify matching fail - please input isChecked'
      }
    )
  }
  const mentor_USN = await matchingDAO.searchUSN([req.body.mentor_ID]);
  const mentee_USN = await matchingDAO.searchUSN([req.body.mentee_ID]);
  const data = [
    mentor_USN[0].usn,
    mentee_USN[0].usn,
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
        'message': 'get modify matching success',
        'matching': result
      }
    )
  } catch (e) {
    res.status(500).send()
  }
}

const getMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getMatching');
  
  try {
    let resultData = [];
    
    if (req.query.queryType === 'SEARCH') { //추후 페이징 쿼리와 구분하기 위해 임시로 구분자쿼리를 함께 보냈습니다.
      console.log('controller: getMatching [SEARCH]');
      // 매칭정보 검색
      let inputData = [
          req.query.startDateSubmit,
          req.query.endDateSubmit
        ];

        console.log(inputData);
  
      let extraQuery = '';
  
      if (req.query.state !== '-1' && req.query.state !== null) {
        extraQuery += ` AND m.state = ${req.query.state}`;
      }
      if (req.query.menteeID !== null && req.query.menteeID !== '') {
        extraQuery += ` AND mentee.ID = '${req.query.menteeID}'`;
      }
      if (req.query.mentorID !== null && req.query.mentorID !== '') {
        extraQuery += ` AND mentor.ID = '${req.query.mentorID}'`;
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
        'matching': resultData,
      }
    );

  } catch (e) {
    res.status(500).send()
  }
};

const getMatchingDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getMatchingDetail');
  if (req.params.id === null || req.params.id === '' || req.params.id === undefined) {
    res.status(400).send(
      {
        'message': 'get matching detail fail - please input id'
      }
    )
  }
  
  try {
    const result = await matchingDAO.getMatching([req.params.id]);
    res.status(200).render('matching/matchingDetail',
      {
        'message': 'get matching detail success',
        'matching': result[0]
      }
    )
  } catch (e) {
    res.status(500).send('get matching detail fail - unexpected errors occur in db')
  }
};

router.get('/', getMatching);
router.get('/:id', getMatchingDetail);
router.get('/update/:id', renderModifyForm);
router.put('/update/:id', modifyMatching)
router.post('/', createMatching);
router.delete('/:id', deleteMatching);

export = router;
