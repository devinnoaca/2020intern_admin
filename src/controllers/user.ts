import * as express from 'express';
import userQuery from '../dao/userDAO'

const router = express.Router();

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //permission을 따로 안받고 있음................
  const data = 
  [
    req.body.id,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.image_url,
    req.body.description,
    req.body.company,
    req.body.permission,
    req.body.noti_count,
    req.body.type
  ]

  const result = await userQuery.createUser(data);

  res.status(200).redirect('user');
  console.log('controller: createUser');
};

const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = await userQuery.getUsers();

  res.status(200).render('user/user',
    {
      'message': 'get user list success',
      'users': result
    }
  );
  
  console.log('controller: getUsers');
};

const getUser = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
    const param = 
    [
      parseInt(req.params.usn)
    ];
  let result = await userQuery.getUser(param);
  let keywordResult = await userQuery.getUserKeywords(param);
  let careerID: Array<Number> = new Array();
  let career: Array<String | Number> = new Array(); 
  result.map( (current, index, result) => {
    careerID.push(current.careerID);
    career.push(current.career);
  })
  result = [result[0]];
  result[0].careerID = careerID;
  result[0].career = career;
  result[0].keywords = keywordResult;

  res.status(200).render('user/userDetail' ,
    {
      'message': 'success',
      'user': result
    }
  )
  console.log('controller: getUser');
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    parseInt(req.params.usn)
  ];
  const result = await userQuery.deleteUser(data);
res.status(200).send(
    {
    'message': 'delete user success',
    }
  );
console.log('controller: deleteUser');
};

const modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let data: Array<any>;
  let result;
  console.log(req.body.password);
  if (req.body.password === null) {
    data = 
    [
      req.body.email,
      req.body.name,
      req.body.image,
      req.body.description,
      req.body.notification,
      req.body.permission,
      req.body.type,
      parseInt(req.params.usn)
    ];
    result = await userQuery.modifyUserWithoutPW(data);
    res.status(200).send(
        {
          'message': 'modify user without password success'
        }
      );
    console.log('controller: modifyUserWithoutPW');
  } else {
    data =
    [
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.image,
      req.body.description,
      req.body.notification,
      req.body.permission,
      req.body.type,
      parseInt(req.params.usn)
    ];
    result = await userQuery.modifyUser(data);
    res.status(200).send(
      {
        'message': 'modify user success'
      }
    );
    console.log('controller: modifyUser');
  }
};

const createUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    parseInt(req.params.usn),
    req.body.content
  ];
  const result = await userQuery.createUserCareer(data);
  res.status(200).send(
    {
      'message': 'create user career success',
      'careerID': result.insertId
    }
  );
  console.log('controller: createUserCareer');
}

const modifyUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    req.body.career_id,
    req.body.career
  ];
  const result = await userQuery.modifyUserCareer(data);
  res.status(200).send(
    {
      'message': 'modify user career success'
    }
  );
  console.log('controller: modifyUserCareer');
}

const deleteUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = 
  [
    req.body.career_id
  ];
  const result = await userQuery.deleteUserCareer(data);
  res.status(200).send(
    {
      'message': 'delete user career success'
    }
  );
  console.log('controller: deleteUserCareer');
}

const createUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    parseInt(req.params.usn),
    req.body.keyword_id
  ]
  const result = await userQuery.createUserRecommendKeyword(data);
  res.status(200).send(
    {
      'message': 'create user recommend keyword success'
    }
  );
  console.log('controller: createUserRecommendKeyword');
}

const deleteUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    parseInt(req.params.usn),
    req.body.keyword_id
  ]
  const result = await userQuery.deleteUserRecommendKeyword(data);
  res.status(200).send(
    {
      'message': 'delete user recommend keyword success'
    }
  );
  console.log('controller: deleteUserRecommendKeyword');
}

const createUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    parseInt(req.params.usn),
    req.body.keyword_id
  ]
  const result = await userQuery.createUserTotalKeyword(data);
  res.status(200).send(
    {
      'message': 'create user total keyword success'
    }
  );
  console.log('controller: createUserTotalKeyword');
}

const deleteUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
  [
    parseInt(req.params.usn),
    req.body.keyword_id
  ]
  const result = await userQuery.deleteUserTotalKeyword(data);
  res.status(200).send(
    {
      'message': 'delete user total keyword success'
    }
  );
  console.log('controller: deleteUserTotalKeyword');
}

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:usn', getUser);
router.delete('/:usn', deleteUser);
router.put('/:usn', modifyUser);
router.post('/:usn/career', createUserCareer);
router.put('/:usn/career', modifyUserCareer);
router.delete('/:usn/career', deleteUserCareer);
router.post('/:usn/keyword-re', createUserRecommendKeyword);
router.delete('/:usn/keyword-re', deleteUserRecommendKeyword);
router.post('/:usn/keyword-to', createUserTotalKeyword);
router.delete('/:usn/keyword-to', deleteUserTotalKeyword);
export = router;
