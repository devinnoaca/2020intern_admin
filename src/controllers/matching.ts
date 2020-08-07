import * as express from 'express';
import matchingDAO from '../dao/matchingDAO'

const router = express.Router();

const createMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let is_checked = true;
  //매칭요청이 대기 상태로 생성 될 시, 읽지 않음으로 생성
  if(req.body.state == 0) {
    is_checked = false;
  }

  const data = [
    req.body.mentorUSN, //mentor_USN
    req.body.menteeUSN, //mentee_USN
    new Date(), //request_time
    req.body.state, //state
    is_checked, //is_checked
    req.body.requestMessage,
    req.body.responseMessage
  ];

  const result = await matchingDAO.createMatching(data);

  // res.status(200).send({
  //   'message': 'create category success',
  // });
  res.redirect('/matching');
  console.log('controller: createMatching');
};


const deleteMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = [
    req.params.id
  ];

  const result = await matchingDAO.deleteMatching(data);
  (result);
  res.status(200).send(
    {
      'message': 'delete category success'
    }
  )
  console.log('controller: deleteCategory');
};

const modifyForm = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  let data = await matchingDAO.getMatching([req.params.id]);
  res.status(200).render('matching/matchingUpdate',
    {
      message: 'get modify form success',
      matching: data[0]
    }
  )
  console.log('controller: updateMatching');
}

const modifyMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

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

  const result = await matchingDAO.modifyMatching(data);
  console.log(result);
  res.status(200).send(
    {
      message: 'get modify matching success',
      matching: result
    }
  )
  console.log('controller: updateMatching');
}



const getMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let data = await matchingDAO.getAllMatching();

  res.status(200).render('matching/matching',
    {
      message: 'get category success',
      matching: data
    }
  )
  console.log('controller: getMatching');
};

const getMatchingDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let data = await matchingDAO.getMatching([req.params.id]);

  res.status(200).render('matching/matchingDetail',
    {
      message: 'get category success',
      matching: data[0]
    }
  )
  console.log('controller: getMatching');
};

router.get('/', getMatching);
router.get('/:id', getMatchingDetail);
router.get('/update/:id', modifyForm);
router.put('/update/:id', modifyMatching)
router.post('/', createMatching);
router.delete('/:id', deleteMatching);

export = router;
