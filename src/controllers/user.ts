import * as express from 'express';
import userQuery from '../dao/userDAO'

const router = express.Router();

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUser');
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'create user fail - please input id'
      }
    )
  }
  else if (req.body.name === null || req.body.name === '' || req.body.name === undefined) {
    res.status(400).send(
      {
        'message': 'create user fail - please input name'
      }
    )
  }
  else if (req.body.password === null || req.body.password === '' || req.body.password === undefined) {
    res.status(400).send(
      {
        'message': 'create user fail - please input password'
      }
    )
  }
  else if (req.body.email === null || req.body.email === '' || req.body.email === undefined) {
    res.status(400).send(
      {
        'message': 'create user fail - please input email'
      }
    )
  }
  else if (req.body.type === null || req.body.type === '' || req.body.type === undefined) {
    res.status(400).send(
      {
        'message': 'create user fail - please input type'
      }
    )
  }
  const data = 
  [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.image_url,
    req.body.description,
    req.body.company,
    req.body.permission,
    req.body.type
  ]
  try {
    const result = await userQuery.createUser(data);

    res.status(200).redirect('user');
  } catch (e) {
    res.status(500).send()
  }
};

const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getUsers');
  try {
    const result = await userQuery.getUsers();

    res.status(200).render('user/user',
      {
        'message': 'get users success',
        'users': result
      }
    );
  } catch (e) {
    res.status(500).send()
  }
};

const getUser = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
  console.log('controller: getUser');
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'get user fail - please input usn'
      }
    )
  }
  const data = 
  [
    parseInt(req.params.usn)
  ];
  try {
    let result = await userQuery.getUser(data);
    let keywordResult = await userQuery.getUserKeywords(data);
    let careerID: Array<Number> = new Array();
    let career: Array<String | Number> = new Array(); 
    result.map( (current, index, result) => {
      if (current.careerID != null) {
        careerID.push(current.careerID);
      }
      if (current.career != null) {
        career.push(current.career);
      }
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
  } catch (e) {
    res.status(500).send()
  }
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUser');
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'delete user fail - please input usn'
      }
    )
  }
  const data = 
  [
    parseInt(req.params.usn)
  ];
  try {
    const result = await userQuery.deleteUser(data);
    res.status(200).send(
      {
      'message': 'delete user success',
      }
    );
  } catch (e) {
    res.status(500).send()
  }
};

const modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: modifyUser');
  if (req.body.email === null || req.body.email === '' || req.body.email === undefined) {
    res.status(400).send(
      {
        'message': 'modify user fail - please input email'
      }
    )
  }
  else if (req.body.name === null || req.body.name === '' || req.body.name === undefined) {
    res.status(400).send(
      {
        'message': 'modify user fail - please input name'
      }
    )
  }
  else if (req.body.permission === null || req.body.permission === '' || req.body.permission === undefined) {
    res.status(400).send(
      {
        'message': 'modify user fail - please input permission'
      }
    )
  }
  else if (req.body.type === null || req.body.type === '' || req.body.type === undefined) {
    res.status(400).send(
      {
        'message': 'modify user fail - please input type'
      }
    )
  }
  
  let data;
  let result;
  try {
    if (req.body.password === null || req.body.password === undefined || req.body.password === '') {
    data = 
    [
      req.body.name,
      req.body.email,
      req.body.image_url,
      req.body.description,
      req.body.company,
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
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.image_url,
      req.body.description,
      req.body.company,
      req.body.permission,
      req.body.type,
      parseInt(req.params.usn)
    ];
    result = await userQuery.modifyUser(data);
    res.status(200).send(
      {
        'message': 'modify user success'
      }
    );}
  } catch (e) {
    res.status(500).send()
  }
};

const createUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserCareer');
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'create user career fail - please input usn'
      }
    )
  }
  if (req.body.content === null || req.body.content === '' || req.body.content === undefined) {
    res.status(400).send(
      {
        'message': 'create user career fail - please input content'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.content
  ];
  try {
    const result = await userQuery.createUserCareer(data);
    const content = req.body.content;
    res.status(200).send(
      {
        'message': 'create user career success',
        'careerID': result.insertId,
        'content': content
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const modifyUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: modifyUserCareer');
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'modify user career fail - please input id'
      }
    )
  }
  else if (req.body.content === null || req.body.content === '' || req.body.content === undefined) {
    res.status(400).send(
      {
        'message': 'modify user career fail - please input content'
      }
    )
  }
  const data =
  [
    req.body.content,
    req.body.id 
  ];
  try {
    const result = await userQuery.modifyUserCareer(data);
    res.status(200).send(
      {
        'message': 'modify user career success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUserCareer');
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'delete user career fail - please input id'
      }
    )
  }
  const data = 
  [
    req.body.id
  ];
  try {
    const result = await userQuery.deleteUserCareer(data);
    res.status(200).send(
      {
        'message': 'delete user career success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const createUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserRecommendKeyword');
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'create user recommend keyword fail - please input usn'
      }
    )
  }
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'create user recommend keyword fail - please input id'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.createUserRecommendKeyword(data);
    res.status(200).send(
      {
        'message': 'create user recommend keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUserRecommendKeyword');
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'delete user recommend keyword fail - please input usn'
      }
    )
  }
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'delete user recommend keyword fail - please input id'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.deleteUserRecommendKeyword(data);
    res.status(200).send(
      {
        'message': 'delete user recommend keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const createUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserTotalKeyword');
  if (req.params.usn === null || req.params.usn === '') {
    res.status(400).send(
      {
        'message': 'create user total keyword fail - please input usn'
      }
    )
  }
  else if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'create user total keyword fail - please input id'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.createUserTotalKeyword(data);
    res.status(200).send(
      {
        'message': 'create user total keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.params.usn === null || req.params.usn === '' || req.params.usn === undefined) {
    res.status(400).send(
      {
        'message': 'delete user total keyword fail - please input usn'
      }
    )
  }
  if (req.body.id === null || req.body.id === '' || req.body.id === undefined) {
    res.status(400).send(
      {
        'message': 'delete user total keyword fail - please input id'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.deleteUserTotalKeyword(data);
    res.status(200).send(
      {
        'message': 'delete user total keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
  console.log('controller: deleteUserTotalKeyword');
}

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:usn', getUser);
router.delete('/:usn', deleteUser);
router.put('/:usn', modifyUser);
router.post('/career/:usn', createUserCareer);
router.put('/career/:usn', modifyUserCareer);
router.delete('/career/:usn', deleteUserCareer);
router.post('/keyword/recommend/:usn', createUserRecommendKeyword);
router.delete('/keyword/recommend/:usn', deleteUserRecommendKeyword);
router.post('/keyword/total/:usn', createUserTotalKeyword);
router.delete('/keyword/total/:usn', deleteUserTotalKeyword);
export = router;
